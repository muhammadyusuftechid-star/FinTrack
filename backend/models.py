from sqlalchemy import Column, Integer, String, Float, ForeignKey
from sqlalchemy.orm import relationship
import database

class User(database.Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, index=True)
    password_hash = Column(String(255))
    
    transactions = relationship("Transaction", back_populates="owner")

class Transaction(database.Base):
    __tablename__ = "transactions"

    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(255), index=True)
    amount = Column(Float)
    type = Column(String(50)) # 'income' atau 'expense'
    category = Column(String(100), nullable=True)
    note = Column(String(255), nullable=True)
    date = Column(String(20)) # Disimpan sebagai YYYY-MM-DD string
    
    user_id = Column(Integer, ForeignKey("users.id"))
    owner = relationship("User", back_populates="transactions")
