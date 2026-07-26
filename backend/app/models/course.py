from sqlalchemy import Column, Integer, String, Text

from .base import Base


class Course(Base):
    __tablename__ = "courses"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String)
    degree_level = Column(String)
    duration = Column(String)
    description = Column(Text)