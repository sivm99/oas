import path from "path";
import { Database } from "sqlite3";
import fs from "fs/promises";

/**
 * Handles all payment-related operations including creation, updates and queries
 */
export class PaymentHandler {
  private static readonly PAYMENT_PROVIDERS = ["phonepe", "payu"] as const;
  private static readonly PAYMENT_STATUS = [
    "failed",
    "success",
    "pending",
  ] as const;
  private static db: Database | null = null;

  /**
   * Initializes the SQLite database and creates the payments table if it doesn't exist
   * @private
   * @returns {Promise<void>}
   * @throws {Error} If database initialization fails
   */
  private static async initializeDB(): Promise<void> {
    if (this.db) return;

    try {
      const dbDir = path.join(process.cwd(), "data");
      await fs.mkdir(dbDir, { recursive: true });

      const dbPath = path.join(dbDir, "payments.sqlite");

      return new Promise((resolve, reject) => {
        this.db = new Database(dbPath, (err) => {
          if (err) {
            reject(new Error(`Database initialization failed: ${err.message}`));
            return;
          }

          this.db!.run(
            `
            CREATE TABLE IF NOT EXISTS payments (
              id INTEGER PRIMARY KEY AUTOINCREMENT,
              username TEXT NOT NULL,
              provider TEXT CHECK(provider IN ('phonepe', 'payu')) NOT NULL,
              plan TEXT NOT NULL,
              suid TEXT,
              txnid TEXT UNIQUE,
              muid TEXT,
              status TEXT CHECK(status IN ('failed', 'success', 'pending')) NOT NULL,
              remarks TEXT,
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

  /**
   * Creates a new payment record in the database
   * @param {string} username - The username associated with the payment
   * @param {string} provider - The payment provider (phonepe or payu)
   * @param {string} plan - The subscription plan
   * @param {string} [suid] - Optional subscription unique ID
   * @param {string} [txnid] - Optional transaction ID
   * @param {string} [muid] - Optional merchant unique ID
   * @param {string} [status="pending"] - Payment status
   * @param {string} [remarks] - Optional remarks about the payment
   * @returns {Promise<number>} The ID of the newly created payment record
   * @throws {Error} If payment creation fails
   */
  static async createPayment(
    username: string,
    provider: (typeof PaymentHandler.PAYMENT_PROVIDERS)[number],
    plan: string,
    suid?: string,
    txnid?: string,
    muid?: string,
    status: (typeof PaymentHandler.PAYMENT_STATUS)[number] = "pending",
    remarks?: string,
  ): Promise<number> {
    await this.initializeDB();

    if (!this.db) {
      throw new Error("Database not initialized");
    }

    return new Promise((resolve, reject) => {
      this.db!.run(
        `INSERT INTO payments (username, provider, plan, suid, txnid, muid, status, remarks, timestamp)
         VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          username,
          provider,
          plan,
          suid,
          txnid,
          muid,
          status,
          remarks,
          Date.now(),
        ],
        function (err) {
          if (err) {
            reject(new Error(`Failed to create payment: ${err.message}`));
            return;
          }
          resolve(this.lastID);
        },
      );
    });
  }

  /**
   * Updates the status and remarks of an existing payment
   * @param {string} txnid - The transaction ID of the payment to update
   * @param {string} status - The new payment status (failed, success or pending)
   * @param {string} [remarks] - Optional remarks about the status update
   * @returns {Promise<void>}
   * @throws {Error} If payment update fails or payment not found
   */
  static async updatePaymentStatus(
    txnid: string,
    status: (typeof PaymentHandler.PAYMENT_STATUS)[number],
    remarks?: string,
  ): Promise<void> {
    await this.initializeDB();

    if (!this.db) {
      throw new Error("Database not initialized");
    }

    return new Promise((resolve, reject) => {
      this.db!.run(
        `UPDATE payments SET status = ?, remarks = ?, timestamp = ? WHERE txnid = ?`,
        [status, remarks, Date.now(), txnid],
        function (err) {
          if (err) {
            reject(
              new Error(`Failed to update payment status: ${err.message}`),
            );
            return;
          }
          if (this.changes === 0) {
            reject(new Error(`No payment found with txnid: ${txnid}`));
            return;
          }
          resolve();
        },
      );
    });
  }

  /**
   * Retrieves a payment record by transaction ID
   * @param {string} txnid - The transaction ID to search for
   * @returns {Promise<unknown>} The payment record if found
   * @throws {Error} If query fails
   */
  static async getPaymentByTxnId(txnid: string): Promise<unknown> {
    await this.initializeDB();

    if (!this.db) {
      throw new Error("Database not initialized");
    }

    return new Promise((resolve, reject) => {
      this.db!.get(
        `SELECT * FROM payments WHERE txnid = ?`,
        [txnid],
        (err, row) => {
          if (err) {
            reject(new Error(`Failed to get payment: ${err.message}`));
            return;
          }
          resolve(row);
        },
      );
    });
  }

  /**
   * Retrieves all payments for a specific user
   * @param {string} username - The username to search for
   * @returns {Promise<unknown>} Array of payment records
   * @throws {Error} If query fails
   */
  static async getUserPayments(username: string): Promise<unknown> {
    await this.initializeDB();

    if (!this.db) {
      throw new Error("Database not initialized");
    }

    return new Promise((resolve, reject) => {
      this.db!.all(
        `SELECT * FROM payments WHERE username = ? ORDER BY timestamp DESC`,
        [username],
        (err, rows) => {
          if (err) {
            reject(new Error(`Failed to get user payments: ${err.message}`));
            return;
          }
          resolve(rows || []);
        },
      );
    });
  }
}
