"""empty message

Revision ID: c9b42a98b30d
Revises: 
Create Date: 2020-06-10 14:01:51.167000

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import postgresql

# revision identifiers, used by Alembic.
revision = 'c9b42a98b30d'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('item',
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('price', sa.Float(), nullable=True),
    sa.Column('priceperunit', sa.Float(), nullable=True),
    sa.Column('store', sa.String(), nullable=True),
    sa.PrimaryKeyConstraint('name')
    )
    op.create_table('name',
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('uuid', postgresql.UUID(), nullable=True),
    sa.PrimaryKeyConstraint('name')
    )
    op.create_table('store',
    sa.Column('name', sa.String(), nullable=False),
    sa.Column('location', sa.Float(), nullable=True),
    sa.Column('delivery', sa.Boolean(), nullable=True),
    sa.Column('pickup', sa.Boolean(), nullable=True),
    sa.PrimaryKeyConstraint('name')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('store')
    op.drop_table('name')
    op.drop_table('item')
    # ### end Alembic commands ###
