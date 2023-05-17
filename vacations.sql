/*
create database vacation 
use vacation
*/

/*
create table user (
id int auto_increment,
first_name varchar(30) not null,
last_name varchar(30) not null,
username varchar(30) not null,
password text not null, 
role varchar(20) default 'user',
primary key (id)
)
*/

/*
create table vacations(
id int auto_increment,
description varchar(255) not null,
destination varchar(255) not null,
photo varchar(255),
date_from date not null,
date_to date not null,
price varchar(30) not null,
primary key (id)
)
*/

/*
create table follows(
id int auto_increment,
user_id int not null,
vacations_id int not null,
primary key (id),
foreign key (user_id) references user(id),
foreign key (vacations_id) references vacations(id)
)
*/

/*
select * from vacations
select * from user
select * from follows
*/
 
 /* get vacations with count of follows
 select v.*, count(f.user_id) as follows
 from vacations as v
 LEFT join follows as f
 on v.id = f.vacations_id
 group by v.id
 order by follows desc
 */
 
/*
UPDATE user
SET role = 'admin' -- or 'user'
WHERE id = 1;
*/

