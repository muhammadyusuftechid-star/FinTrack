from pydantic import BaseModel
from typing import Optional

# ----- Users -----
class UserCreate(BaseModel):
    username: str
    password: str

class UserResponse(BaseModel):
    id: int
    username: str
    class Config:
        from_attributes = True

# ----- Tokens -----
class Token(BaseModel):
    access_token: str
    token_type: str

class TokenData(BaseModel):
    username: Optional[str] = None

# ----- Transactions -----
class TransactionBase(BaseModel):
    title: str
    amount: float
    type: str
    category: Optional[str] = None
    date: str

class TransactionCreate(TransactionBase):
    pass

class Transaction(TransactionBase):
    id: int
    user_id: int

    class Config:
        from_attributes = True
