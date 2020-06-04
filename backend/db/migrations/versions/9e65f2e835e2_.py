"""empty message

Revision ID: 9e65f2e835e2
Revises: 2e06bc5023f4
Create Date: 2020-05-27 22:50:28.111000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = '9e65f2e835e2'
down_revision = '2e06bc5023f4'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('Item', 'priceperunit')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('Item', sa.Column('priceperunit', postgresql.DOUBLE_PRECISION(precision=53), autoincrement=False, nullable=True))
    # ### end Alembic commands ###