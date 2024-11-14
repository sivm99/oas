import { Database } from "sqlite3";
import crypto from "crypto";
import path from "path";
import fs from "fs/promises";

interface TokenData {
  encoded_token: string;
  original_token: string;
  timestamp: number;
}

interface TokenCount {
  count: number;
}

export class TokenHandler {
  private static readonly PREFIX = "oas_";
  private static readonly SECRET_KEY = process.env.TOKEN_KEY;
  private static readonly HOUR_IN_MS = 3600000;
  private static db: Database | null = null;

  // Initialize database
  private static async initializeDB(): Promise<void> {
    if (this.db) return;

    try {
      // Ensure the data directory exists
      const dbDir = path.join(process.cwd(), "data");
      await fs.mkdir(dbDir, { recursive: true });

      const dbPath = path.join(dbDir, "tokens.sqlite");

      return new Promise((resolve, reject) => {
        this.db = new Database(dbPath, (err) => {
          if (err) {
            reject(new Error(`Database initialization failed: ${err.message}`));
            return;
          }

          // Create tokens table if it doesn't exist
          this.db!.run(
            `
            CREATE TABLE IF NOT EXISTS tokens (
              encoded_token TEXT PRIMARY KEY,
              original_token TEXT NOT NULL,
              timestamp INTEGER NOT NULL
            )
            `,
            (err) => {
              if (err) {
                reject(new Error(`Table creation failed: ${err.message}`));
                return;
              }
              resolve();
            },
          );
        });
      });
    } catch (error) {
      throw new Error(
        `Database initialization failed: ${(error as Error).message}`,
      );
    }
  }

  private static validateSecretKey(): void {
    if (!this.SECRET_KEY) {
      throw new Error("TOKEN_KEY environment variable is not set");
    }
  }

  private static async generateRandomString(): Promise<string> {
    this.validateSecretKey();

    try {
      const randomBytes = crypto.randomBytes(32);
      const hash = crypto
        .createHmac("sha256", this.SECRET_KEY!)
        .update(randomBytes.toString("hex") + Date.now().toString())
        .digest("base64")
        .replace(/[+/=]/g, ""); // Remove any base64 padding characters

      return hash.slice(0, 20); // Return 20 characters of the base64 string
    } catch (error) {
      throw new Error(
        `Failed to generate random string: ${(error as Error).message}`,
      );
    }
  }

  private static async cleanExpiredTokens(): Promise<void> {
    await this.initializeDB();
    const now = Date.now();

    if (!this.db) {
      throw new Error("Database not initialized");
    }

    return new Promise((resolve, reject) => {
      this.db!.run(
        `DELETE FROM tokens WHERE (? - timestamp) > ?`,
        [now, this.HOUR_IN_MS],
        (err) => {
          if (err) {
            reject(new Error(`Failed to clean expired tokens: ${err.message}`));
            return;
          }
          resolve();
        },
      );
    });
  }

  private static async updateTokenTimestamp(
    encodedToken: string,
  ): Promise<void> {
    await this.initializeDB();
    const now = Date.now();

    if (!this.db) {
      throw new Error("Database not initialized");
    }

    return new Promise((resolve, reject) => {
      this.db!.run(
        `UPDATE tokens SET timestamp = ? WHERE encoded_token = ?`,
        [now, encodedToken],
        (err) => {
          if (err) {
            reject(
              new Error(`Failed to update token timestamp: ${err.message}`),
            );
            return;
          }
          resolve();
        },
      );
    });
  }

  static async encode(token: string): Promise<string> {
    if (!token) {
      throw new Error("Token cannot be empty");
    }

    await this.initializeDB();
    await this.cleanExpiredTokens();

    if (!this.db) {
      throw new Error("Database not initialized");
    }

    try {
      // Check for existing token
      const existingToken = await new Promise<TokenData | undefined>(
        (resolve, reject) => {
          this.db!.get<TokenData>(
            `SELECT encoded_token, original_token, timestamp FROM tokens WHERE original_token = ?`,
            [token],
            (err, row) => {
              if (err) {
                reject(
                  new Error(`Failed to check existing token: ${err.message}`),
                );
                return;
              }
              resolve(row);
            },
          );
        },
      );

      if (existingToken) {
        await this.updateTokenTimestamp(existingToken.encoded_token);
        return existingToken.encoded_token;
      }

      // Generate new token
      const randomString = await this.generateRandomString();
      const encodedToken = `${this.PREFIX}${randomString}`;
      const now = Date.now();

      await new Promise<void>((resolve, reject) => {
        this.db!.run(
          `INSERT INTO tokens (encoded_token, original_token, timestamp) VALUES (?, ?, ?)`,
          [encodedToken, token, now],
          (err) => {
            if (err) {
              reject(new Error(`Failed to insert new token: ${err.message}`));
              return;
            }
            resolve();
          },
        );
      });

      return encodedToken;
    } catch (error) {
      throw new Error(`Token encoding failed: ${(error as Error).message}`);
    }
  }

  static async decode(encodedToken: string): Promise<string | null> {
    if (!encodedToken) {
      console.log("Token rejected: Empty token");
      return null;
    }

    if (!encodedToken.startsWith(this.PREFIX)) {
      console.log("Token rejected: Invalid prefix, expected", this.PREFIX);
      return null;
    }

    try {
      await this.initializeDB();
      await this.cleanExpiredTokens();

      if (!this.db) {
        throw new Error("Database not initialized");
      }

      const tokenData = await new Promise<TokenData | undefined>(
        (resolve, reject) => {
          this.db!.get<TokenData>(
            `SELECT encoded_token, original_token, timestamp FROM tokens WHERE encoded_token = ?`,
            [encodedToken],
            (err, row) => {
              if (err) {
                reject(new Error(`Failed to retrieve token: ${err.message}`));
                return;
              }
              resolve(row);
            },
          );
        },
      );

      if (!tokenData) {
        console.log("Token rejected: Not found in database");
        return null;
      }

      if (Date.now() - tokenData.timestamp > this.HOUR_IN_MS) {
        console.log("Token rejected: Expired");
        await this.removeToken(encodedToken);
        return null;
      }

      await this.updateTokenTimestamp(encodedToken);
      return tokenData.original_token;
    } catch (error) {
      console.error(`Token decoding failed: ${(error as Error).message}`);
      return null;
    }
  }

  static async isValidEncodedToken(token: string): Promise<boolean> {
    if (!token) return false;
    return token.startsWith(this.PREFIX) && (await this.decode(token)) !== null;
  }

  static async removeToken(encodedToken: string): Promise<void> {
    await this.initializeDB();

    if (!this.db) {
      throw new Error("Database not initialized");
    }

    return new Promise((resolve, reject) => {
      this.db!.run(
        `DELETE FROM tokens WHERE encoded_token = ?`,
        [encodedToken],
        (err) => {
          if (err) {
            reject(new Error(`Failed to remove token: ${err.message}`));
            return;
          }
          resolve();
        },
      );
    });
  }

  static async getActiveTokenCount(): Promise<number> {
    try {
      await this.initializeDB();
      await this.cleanExpiredTokens();

      if (!this.db) {
        throw new Error("Database not initialized");
      }

      const result = await new Promise<TokenCount>((resolve, reject) => {
        this.db!.get<TokenCount>(
          `SELECT COUNT(*) as count FROM tokens`,
          [],
          (err, row) => {
            if (err) {
              reject(new Error(`Failed to get token count: ${err.message}`));
              return;
            }
            resolve(row || { count: 0 });
          },
        );
      });

      return result.count;
    } catch (error) {
      console.error(
        `Failed to get active token count: ${(error as Error).message}`,
      );
      return 0;
    }
  }
}
