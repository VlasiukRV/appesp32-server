-- This file allow to write SQL commands that will be emitted in test and dev.
-- The commands are commented as their support depends of the database
-- insert into myentity (id, field) values(1, 'field-1');
-- insert into myentity (id, field) values(2, 'field-2');
-- insert into myentity (id, field) values(3, 'field-3');
-- alter sequence myentity_seq restart with 4;
insert into roles (role) values ('admin');
insert into roles (role) values ('user');

insert into users (username, password) values ('admin', 'app');
insert into users (username, password) values ('user', 'user');

insert into role_user_detail(role_id, user_id) SELECT roles.id as role_id, users.id as user_id
            	FROM roles, users

            	WHERE(users.username IN('admin') AND roles.role IN ('admin'));
