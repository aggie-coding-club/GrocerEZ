from sqlalchemy import create_engine  
from sqlalchemy import Column, String, Float  
from sqlalchemy.ext.declarative import declarative_base  
from sqlalchemy.orm import sessionmaker
import psycopg2

db_string = "postgres://xpcdulaqqancpa:0616d8130a659a869dacb11768aaf0d8f87f741b19fc8bf46d3af34c78f5ca85@ec2-34-200-72-77.compute-1.amazonaws.com:5432/ddjr78vh1cvcc4"

db = create_engine(db_string)
base = declarative_base()

class Item(base):
  __tablename__ = 'Item'

  __mapper_args__ = {
    'confirm_deleted_rows': False
  }

  name = Column(String, primary_key=True)
  price = Column(Float)
  priceperunit = Column(Float)
  store = Column(String)

Session = sessionmaker(db)
session = Session()

base.metadata.create_all(db)

arjun_item = Item(name='arjun', price=0, priceperunit=0, store='mom')
session.add(arjun_item)
session.commit()

#test = session.query(Item).get('Srikar')
#test.name = 'arjun'
#session.commit()

items = session.query(Item)
for item in items:
  print(item.name)
