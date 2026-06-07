from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# Fallback ke sqlite agar aplikasi bisa langsung jalan tanpa repot setup MySQL server lokal dulu.
# Untuk menggunakan MySQL, ganti dengan: "mysql+pymysql://root:@localhost:3306/fintrack_db"
SQLALCHEMY_DATABASE_URL = "sqlite:///./fintrack.db"

engine = create_engine(
    SQLALCHEMY_DATABASE_URL, 
    connect_args={"check_same_thread": False} # Wajib untuk SQLite di FastAPI
)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)

Base = declarative_base()

def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()
