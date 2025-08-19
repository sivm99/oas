import crypto from "node:crypto";
import { Database } from "sqlite3";

interface TokenData {
  encoded_token: string;
  original_token: string;
  timestamp: number;
}

interface TokenCount {
  count: number;
}

class TokenHandler {
  #PREFIX = "oas_";
  #SECRET_KEY = process.env.TOKEN_KEY;
  #HOUR_IN_MS = 3600000;
  private db: Database | null = null;

  constructor() {
    this.initializeDB()
  }

  // Initialize database
  private async initializeDB(): Promise<void> {
    if (this.db) return;
    try {
      this.db = new Database(":memory:");
      this.db.run(
        `
         CREATE TABLE IF NOT EXISTS tokens (
         encoded_token TEXT PRIMARY KEY,
         original_token TEXT NOT NULL,
         timestamp INTEGER NOT NULL
          )
                 `,
      )
    } catch (error) {
      throw new Error(
        `Database initialization failed: ${(error as Error).message}`,
      );
    }
  }

  private validateSecretKey(): void {
    if (!this.#SECRET_KEY) {
      throw new Error("TOKEN_KEY environment variable is not set");
    }
  }

  private async generateRandomString(): Promise<string> {
    this.validateSecretKey();

    try {
      const randomBytes = crypto.randomBytes(32);
      if (!this.#SECRET_KEY) throw new Error("no secret key was found")
      const hash = crypto
        .createHmac("sha256", this.#SECRET_KEY)
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

  private async cleanExpiredTokens(): Promise<void> {
    await this.initializeDB();
    const now = Date.now();
    if (!this.db) {
      throw new Error("Database not initialized");
    }

    return new Promise((resolve, reject) => {
      if (!this.db) throw new Error("Db coult not be started")
      this.db.run(
        "DELETE FROM tokens WHERE (? - timestamp) > ?",
        [now, this.#HOUR_IN_MS],
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

  private async updateTokenTimestamp(
    encodedToken: string,
  ): Promise<void> {
    await this.initializeDB();
    const now = Date.now();

    if (!this.db) {
      throw new Error("Database not initialized");
    }

    return new Promise((resolve, reject) => {
      if (!this.db) throw new Error("Db coult not be started")
      this.db.run(
        "UPDATE tokens SET timestamp = ? WHERE encoded_token = ?",
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

  async encode(token: string): Promise<string> {
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
          if (!this.db) throw new Error("Db coult not be started")
          this.db.get<TokenData>(
            "SELECT encoded_token, original_token, timestamp FROM tokens WHERE original_token = ?",
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
      const encodedToken = `${this.#PREFIX}${randomString}`;
      const now = Date.now();

      await new Promise<void>((resolve, reject) => {
        if (!this.db) throw new Error("Db coult not be started")
        this.db.run(
          "INSERT INTO tokens (encoded_token, original_token, timestamp) VALUES (?, ?, ?)",
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

  async decode(encodedToken: string): Promise<string | null> {
    if (!encodedToken) {
      console.log("Token rejected: Empty token");
      return null;
    }

    if (!encodedToken.startsWith(this.#PREFIX)) {
      console.log(
        "Token rejected: Invalid prefix, expected",
        this.#PREFIX,
      );
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
          if (!this.db) throw new Error("Db coult not be started")
          this.db.get<TokenData>(
            "SELECT encoded_token, original_token, timestamp FROM tokens WHERE encoded_token = ?",
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

      if (Date.now() - tokenData.timestamp > this.#HOUR_IN_MS) {
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

  async isValidEncodedToken(token: string): Promise<boolean> {
    if (!token) return false;
    return (
      token.startsWith(this.#PREFIX) &&
      (await this.decode(token)) !== null
    );
  }

  async removeToken(encodedToken: string): Promise<void> {
    await this.initializeDB();

    if (!this.db) {
      throw new Error("Database not initialized");
    }

    return new Promise((resolve, reject) => {
      if (!this.db) throw new Error("Db coult not be started")
      this.db.run(
        "DELETE FROM tokens WHERE encoded_token = ?",
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

  async getActiveTokenCount(): Promise<number> {
    try {
      if (!this.db) {
        await this.initializeDB()
        throw new Error("Database not initialized");
      }

      await this.initializeDB();
      await this.cleanExpiredTokens();

      const result = await new Promise<TokenCount>((resolve, reject) => {
        if (!this.db) throw new Error("Db coult not be started")
        this.db.get<TokenCount>(
          "SELECT COUNT(*) as count FROM tokens",
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

export const tokenHandler = new TokenHandler()
