from flask import Flask
from sqlalchemy import create_engine  
from sqlalchemy import Column, String, Float, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base  
from sqlalchemy.orm import sessionmaker

from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

from flask_sqlalchemy import SQLAlchemy
import psycopg2

app = Flask(__name__)

# read in password from config file
config = open('db_password.txt', 'r')
db_password = config.readline().strip()

db_string = "postgres://xpcdulaqqancpa:"+ db_password +"@ec2-34-200-72-77.compute-1.amazonaws.com:5432/ddjr78vh1cvcc4"
app.config['SQLALCHEMY_DATABASE_URI'] = db_string
app.config['SQLALCHEMY TRACK_MODIFICATIONS'] = False

#db = create_engine(db_string)
db = SQLAlchemy(app)
base = declarative_base()

migrate = Migrate(app, db)
manager = Manager(app)

manager.add_command('db', MigrateCommand)

class item(db.Model):
  __tablename__ = 'item'

  __mapper_args__ = {
    'confirm_deleted_rows': False
  }

  name = Column(String, primary_key=True)
  price = Column(Float)
  priceperunit = Column(Float)
  store = Column(String)

class store(db.Model):
  __tablename__ = 'store'

  __mapper_args__ = {
    'confirm_deleted_rows': False
  }

  name = Column(String, primary_key=True)
  location = Column(Float)
  delivery = Column(Boolean)
  pickup = Column(Boolean)

class uuid(db.Model):
  __tablename__ = 'name'

  __mapper_args__ = {
    'confirm_deleted_rows': False
  }

  name = Column(String, primary_key=True)
  uuid = Column(UUID)


if __name__ == '__main__':
  manager.run()
