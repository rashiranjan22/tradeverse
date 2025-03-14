"""Updated BhavCopy model with new fields

Revision ID: ff90dbb39796
Revises: 5025582791e2
Create Date: 2025-03-10 19:43:48.818100

"""
from alembic import op
import sqlalchemy as sa
from sqlalchemy.dialects import mysql

# revision identifiers, used by Alembic.
revision = 'ff90dbb39796'
down_revision = '5025582791e2'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('bhav_copy', schema=None) as batch_op:
        batch_op.add_column(sa.Column('series', sa.String(length=10), nullable=False))
        batch_op.add_column(sa.Column('prev_close', sa.Float(), nullable=True))
        batch_op.add_column(sa.Column('last_price', sa.Float(), nullable=True))
        batch_op.add_column(sa.Column('avg_price', sa.Float(), nullable=True))
        batch_op.add_column(sa.Column('turnover_lacs', sa.Float(), nullable=True))
        batch_op.add_column(sa.Column('no_of_trades', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('deliv_qty', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('deliv_per', sa.Float(), nullable=True))
        batch_op.alter_column('open_price',
               existing_type=mysql.FLOAT(),
               nullable=True)
        batch_op.alter_column('high',
               existing_type=mysql.FLOAT(),
               nullable=True)
        batch_op.alter_column('low',
               existing_type=mysql.FLOAT(),
               nullable=True)
        batch_op.alter_column('close_price',
               existing_type=mysql.FLOAT(),
               nullable=True)
        batch_op.alter_column('volume',
               existing_type=mysql.INTEGER(),
               nullable=True)

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('bhav_copy', schema=None) as batch_op:
        batch_op.alter_column('volume',
               existing_type=mysql.INTEGER(),
               nullable=False)
        batch_op.alter_column('close_price',
               existing_type=mysql.FLOAT(),
               nullable=False)
        batch_op.alter_column('low',
               existing_type=mysql.FLOAT(),
               nullable=False)
        batch_op.alter_column('high',
               existing_type=mysql.FLOAT(),
               nullable=False)
        batch_op.alter_column('open_price',
               existing_type=mysql.FLOAT(),
               nullable=False)
        batch_op.drop_column('deliv_per')
        batch_op.drop_column('deliv_qty')
        batch_op.drop_column('no_of_trades')
        batch_op.drop_column('turnover_lacs')
        batch_op.drop_column('avg_price')
        batch_op.drop_column('last_price')
        batch_op.drop_column('prev_close')
        batch_op.drop_column('series')

    # ### end Alembic commands ###
