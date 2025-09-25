"""add email column to User

Revision ID: c082f2066054
Revises: 8c5087e7acfe
Create Date: 2025-09-25 12:25:50.631662

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'c082f2066054'
down_revision = '8c5087e7acfe'
branch_labels = None
depends_on = None


def upgrade():
    # --- Assignment ---
    with op.batch_alter_table('assignment', schema=None) as batch_op:
        batch_op.alter_column('title',
               existing_type=sa.VARCHAR(length=200),
               type_=sa.String(length=120),
               existing_nullable=False)
        batch_op.alter_column('due_date',
               existing_type=sa.VARCHAR(length=50),
               type_=sa.Date(),
               existing_nullable=True)

    # --- Parent ---
    with op.batch_alter_table('parent', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=False))
        batch_op.create_unique_constraint('uq_parent_user_id', ['user_id'])
        batch_op.create_foreign_key('fk_parent_user', 'user', ['user_id'], ['id'])
        # Drop old columns (if they exist)
        batch_op.drop_column('email')
        batch_op.drop_column('phone')
        batch_op.drop_column('name')

    # --- Student ---
    with op.batch_alter_table('student', schema=None) as batch_op:
        batch_op.add_column(sa.Column('grade', sa.String(length=10), nullable=True))
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=False)
        batch_op.create_unique_constraint('uq_student_user_id', ['user_id'])
        batch_op.drop_column('email')
        batch_op.drop_column('student_class')
        batch_op.drop_column('name')

    # --- Teacher ---
    with op.batch_alter_table('teacher', schema=None) as batch_op:
        batch_op.add_column(sa.Column('user_id', sa.Integer(), nullable=False))
        batch_op.alter_column('subject',
               existing_type=sa.VARCHAR(length=100),
               nullable=True)
        batch_op.create_unique_constraint('uq_teacher_user_id', ['user_id'])
        batch_op.create_foreign_key('fk_teacher_user', 'user', ['user_id'], ['id'])
        batch_op.drop_column('email')
        batch_op.drop_column('name')

    # --- User ---
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('email', sa.String(length=120), nullable=False))
        batch_op.add_column(sa.Column('password_hash', sa.String(length=128), nullable=False))
        batch_op.alter_column('username',
               existing_type=sa.VARCHAR(length=100),
               type_=sa.String(length=80),
               existing_nullable=False)
        batch_op.alter_column('role',
               existing_type=sa.VARCHAR(length=50),
               type_=sa.String(length=20),
               existing_nullable=False)
        batch_op.create_unique_constraint('uq_user_email', ['email'])
        batch_op.drop_column('password')


def downgrade():
    # --- User ---
    with op.batch_alter_table('user', schema=None) as batch_op:
        batch_op.add_column(sa.Column('password', sa.VARCHAR(length=200), nullable=False))
        batch_op.drop_constraint('uq_user_email', type_='unique')
        batch_op.alter_column('role',
               existing_type=sa.String(length=20),
               type_=sa.VARCHAR(length=50),
               existing_nullable=False)
        batch_op.alter_column('username',
               existing_type=sa.String(length=80),
               type_=sa.VARCHAR(length=100),
               existing_nullable=False)
        batch_op.drop_column('password_hash')
        batch_op.drop_column('email')

    # --- Teacher ---
    with op.batch_alter_table('teacher', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.VARCHAR(length=100), nullable=False))
        batch_op.add_column(sa.Column('email', sa.VARCHAR(length=100), nullable=False))
        batch_op.drop_constraint('fk_teacher_user', type_='foreignkey')
        batch_op.drop_constraint('uq_teacher_user_id', type_='unique')
        batch_op.alter_column('subject',
               existing_type=sa.VARCHAR(length=100),
               nullable=False)
        batch_op.drop_column('user_id')

    # --- Student ---
    with op.batch_alter_table('student', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.VARCHAR(length=100), nullable=False))
        batch_op.add_column(sa.Column('student_class', sa.VARCHAR(length=50), nullable=False))
        batch_op.add_column(sa.Column('email', sa.VARCHAR(length=100), nullable=False))
        batch_op.drop_constraint('uq_student_user_id', type_='unique')
        batch_op.alter_column('user_id',
               existing_type=sa.INTEGER(),
               nullable=True)
        batch_op.drop_column('grade')

    # --- Parent ---
    with op.batch_alter_table('parent', schema=None) as batch_op:
        batch_op.add_column(sa.Column('name', sa.VARCHAR(length=100), nullable=False))
        batch_op.add_column(sa.Column('phone', sa.VARCHAR(length=20), nullable=True))
        batch_op.add_column(sa.Column('email', sa.VARCHAR(length=100), nullable=False))
        batch_op.drop_constraint('fk_parent_user', type_='foreignkey')
        batch_op.drop_constraint('uq_parent_user_id', type_='unique')
        batch_op.drop_column('user_id')

    # --- Assignment ---
    with op.batch_alter_table('assignment', schema=None) as batch_op:
        batch_op.alter_column('due_date',
               existing_type=sa.Date(),
               type_=sa.VARCHAR(length=50),
               existing_nullable=True)
        batch_op.alter_column('title',
               existing_type=sa.String(length=120),
               type_=sa.VARCHAR(length=200),
               existing_nullable=False)
