from flask import Flask
from sqlalchemy import create_engine  
from sqlalchemy import Column, String, Float, Boolean
from sqlalchemy.dialects.postgresql import UUID
from sqlalchemy.ext.declarative import declarative_base  
from sqlalchemy.orm import sessionmaker

from flask_script import Manager
from flask_migrate import Migrate, MigrateCommand

from flask_sqlalchemy import SQLAlchemy
from os import path

app = Flask(__name__)
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# read in password from config file
try:
  pw_config = open(path.join(path.dirname(__file__), 'db_password'), 'r')
  dev_pw = pw_config.readline().strip()
  prod_pw = pw_config.readline().strip()
  pw_config.close()
except FileNotFoundError:
  pw_config = open(path.join(path.dirname(__file__), 'db_password'), 'w')
  pw_config.write('<dev password>\n<production password>s')
  print('Created db_password file, please fill it in appropriately')
  exit(1)

try:
  un_config = open(path.join(path.dirname(__file__), 'db_username'), 'r')
  dev_un = un_config.readline().strip()
  prod_un = un_config.readline().strip()
except FileNotFoundError:
  un_config = open(path.join(path.dirname(__file__), 'db_username'), 'w')
  un_config.write('<dev username>\n<production username>')
  print('Created db_username file, please fill it in appropriately')
  exit(1)

# build appropriate db_string
db_string = ''
if app.config['ENV'] == 'development':
  db_string = "postgres://{}:{}@localhost/grocerez".format(dev_un, dev_pw)
else:
  db_string = "postgres://{}:{}@ec2-34-200-72-77.compute-1.amazonaws.com:5432/ddjr78vh1cvcc4".format(prod_un, prod_pw)
print(db_string)

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
