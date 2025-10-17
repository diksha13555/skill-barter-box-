import sqlite3

# Connect to database (creates file if not exists)
conn = sqlite3.connect('feedback.db')
c = conn.cursor()

# Create table
c.execute('''
CREATE TABLE IF NOT EXISTS feedback (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    message TEXT NOT NULL,
    timestamp DATETIME DEFAULT CURRENT_TIMESTAMP
)
''')

conn.commit()
conn.close()
print("Database and table created successfully!")
