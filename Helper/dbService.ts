import { Destination, Rule, User } from "./types";

// dbService.ts
class DatabaseService {
  private dbName = "rulesDB";
  private version = 1;
  private db: IDBDatabase | null = null;
  private initialized = false;

  async init() {
    if (this.initialized) return;
    return new Promise<void>((resolve, reject) => {
      const request = indexedDB.open(this.dbName, this.version);

      request.onerror = () => {
        reject(request.error);
      };

      request.onsuccess = () => {
        this.db = request.result;
        this.initialized = true;
        resolve();
      };

      request.onupgradeneeded = (event) => {
        const db = (event.target as IDBOpenDBRequest).result;

        // Create stores if they don't exist
        if (!db.objectStoreNames.contains("rules")) {
          const rulesStore = db.createObjectStore("rules", {
            keyPath: "ruleId",
          });
          rulesStore.createIndex("username", "username", { unique: false });
          rulesStore.createIndex("destinationEmail", "destinationEmail", {
            unique: false,
          });
        }

        if (!db.objectStoreNames.contains("destinations")) {
          const destinationsStore = db.createObjectStore("destinations", {
            keyPath: "destinationID",
          });
          destinationsStore.createIndex("username", "username", {
            unique: false,
          });
        }

        if (!db.objectStoreNames.contains("users")) {
          db.createObjectStore("users", { keyPath: "username" });
        }
      };
    });
  }

  private getStore(storeName: string, mode: IDBTransactionMode = "readonly") {
    if (!this.db) throw new Error("Database not initialized");
    const transaction = this.db.transaction(storeName, mode);
    return transaction.objectStore(storeName);
  }
  isInitialized(): boolean {
    return this.initialized;
  }
  // Rules operations
  async saveRules(rules: Rule[]) {
    const store = this.getStore("rules", "readwrite");
    await Promise.all(
      rules.map((rule) => {
        return new Promise((resolve, reject) => {
          const request = store.put(rule);
          request.onsuccess = () => resolve(undefined);
          request.onerror = () => reject(request.error);
        });
      }),
    );
  }

  async deleteRuleById(ruleId: number) {
    const store = this.getStore("rules", "readwrite");
    return new Promise<void>((resolve, reject) => {
      const request = store.delete(ruleId);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getRules(username?: string): Promise<Rule[]> {
    const store = this.getStore("rules");

    if (username) {
      const index = store.index("username");
      return new Promise((resolve, reject) => {
        const request = index.getAll(username);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }

    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // async toggleRuleInactiveByDestinationEmail(destinationEmail: string) {
  //   const store = this.getStore("rules", "readwrite");

  //   // First, we need to create the index if it doesn't exist
  //   if (!store.indexNames.contains("destinationEmail")) {
  //     throw new Error("destinationEmail index does not exist");
  //   }

  //   const index = store.index("destinationEmail");

  //   return new Promise<void>((resolve, reject) => {
  //     const request = index.getAll(destinationEmail);

  //     request.onerror = () => reject(request.error);
  //     request.onsuccess = async () => {
  //       const rules: Rule[] = request.result;

  //       if (rules.length === 0) {
  //         reject(new Error("No rules found for this destination email"));
  //         return;
  //       }

  //       try {
  //         // Update each rule's active status
  //         await Promise.all(
  //           rules.map((rule) => {
  //             return new Promise<void>((resolveUpdate, rejectUpdate) => {
  //               const updatedRule = { ...rule, active: !rule.active };
  //               const updateRequest = store.put(updatedRule);

  //               updateRequest.onsuccess = () => resolveUpdate();
  //               updateRequest.onerror = () => rejectUpdate(updateRequest.error);
  //             });
  //           }),
  //         );

  //         resolve();
  //       } catch (error) {
  //         reject(error);
  //       }
  //     };
  //   });
  // }

  // Destinations operations
  async saveDestinations(destinations: Destination[]) {
    const store = this.getStore("destinations", "readwrite");
    await Promise.all(
      destinations.map((destination) => {
        return new Promise((resolve, reject) => {
          const request = store.put(destination);
          request.onsuccess = () => resolve(undefined);
          request.onerror = () => reject(request.error);
        });
      }),
    );
  }

  async deleteDestinationById(destinationID: number, username: string) {
    if (!this.db) throw new Error("Database not initialized");

    try {
      // Create a single transaction for both stores
      const tx = this.db.transaction(["destinations", "users"], "readwrite");
      const store = tx.objectStore("destinations");
      const userStore = tx.objectStore("users");

      return new Promise<void>((resolve, reject) => {
        // Delete destination
        const deleteRequest = store.delete(destinationID);

        deleteRequest.onerror = () => {
          reject(new Error("Failed to delete destination"));
        };

        deleteRequest.onsuccess = () => {
          // After successful deletion, update user's destination count
          const userRequest = userStore.get(username);

          userRequest.onerror = () => {
            reject(new Error("Failed to fetch user data"));
          };

          userRequest.onsuccess = () => {
            const user = userRequest.result;
            if (!user) {
              reject(new Error("User not found"));
              return;
            }

            const updatedUser = {
              ...user,
              destinationCount: Math.max(0, user.destinationCount - 1),
            };

            const updateUserRequest = userStore.put(updatedUser);

            updateUserRequest.onerror = () => {
              reject(new Error("Failed to update user destination count"));
            };

            updateUserRequest.onsuccess = () => {
              resolve();
            };
          };
        };

        // Handle transaction errors
        tx.onerror = () => {
          reject(new Error("Transaction failed"));
        };

        tx.oncomplete = () => {
          // Transaction completed successfully
          resolve();
        };
      });
    } catch (error) {
      throw new Error(`Failed to delete destination: ${error}`);
    }
  }

  async getDestinations(username?: string): Promise<Destination[]> {
    const store = this.getStore("destinations");

    if (username) {
      const index = store.index("username");
      return new Promise((resolve, reject) => {
        const request = index.getAll(username);
        request.onsuccess = () => resolve(request.result);
        request.onerror = () => reject(request.error);
      });
    }

    return new Promise((resolve, reject) => {
      const request = store.getAll();
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // User operations
  async saveUser(user: User) {
    const store = this.getStore("users", "readwrite");
    return new Promise<void>((resolve, reject) => {
      const request = store.put(user);
      request.onsuccess = () => resolve();
      request.onerror = () => reject(request.error);
    });
  }

  async getUser(username: string): Promise<User | undefined> {
    const store = this.getStore("users");
    return new Promise((resolve, reject) => {
      const request = store.get(username);
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error);
    });
  }

  // Helper method to delete all data
  async clearAll() {
    const stores = ["rules", "destinations", "users"];
    await Promise.all(
      stores.map((storeName) => {
        const store = this.getStore(storeName, "readwrite");
        return new Promise<void>((resolve, reject) => {
          const request = store.clear();
          request.onsuccess = () => resolve();
          request.onerror = () => reject(request.error);
        });
      }),
    );
  }
}

// Create a singleton instance
export const db = new DatabaseService();
