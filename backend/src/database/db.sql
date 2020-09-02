-- Tabla de usuarios
create table users(
  id_user serial primary key,
  name_user varchar(45),
  email varchar(45),
  password varchar(45)
);

-- Tabla de compañías
create table companys(
  id_company serial primary key,
  name_company varchar(45)
);

-- Tabla para relación muchos a muchos (usuairos-compañías)
create table contracts(
  id_user integer,
  id_company integer
);

-- Relacionar tabla contratos con usuarios
alter table contracts
add foreign key (id_user) references users(id_user);

-- Relacionar tabla contratos con compañías
alter table contracts
add foreign key (id_company) references users(id_company);

-- Agregar las llaves primarias para no aceptar repetidos
alter table contracts
add primary key (id_user, id_company);


--- Consulta sobre las tablas
select * from contracts
inner join users
on users.id_user = contracts.id_user
inner join companys
on companys.id_company = contracts.id_company

-- Tabla ingresos
create table incomes(
	id_income serial primary key,
	title varchar(45),
	date varchar(45),
	value varchar(45)
);

-- Tabla de egresos
create table expenses(
	id_expense serial primary key,
	title varchar(45),
	date varchar(45),
	value varchar(45)
);

-- Tabla inversiones
create table investments(
	id_investment serial primary key,
	title varchar(45),
	date varchar(45),
	value varchar(45)
);

-- Agregar llaves foráneas
alter table incomes
add id_user integer;
alter table expenses
add id_user integer;
alter table investments
add id_user integer;

-- Generar relación con users
alter table incomes
add foreign key (id_user) references (id_user)
alter table expenses
add foreign key (id_user) references (id_user)
alter table investments
add foreign key (id_user) references (id_user)

-- Inserts

insert into users (name_user, email, password) values ('sebastian', 'sebas@gmail.com', '123123');
insert into users (name_user, email, password) values ('walter white', 'walter@gmail.com', '123123');
insert into users (name_user, email, password) values ('richard feyman', 'richard@gmail.com', '123123');
insert into users (name_user, email, password) values ('stephen hawking', 'stephen@gmail.com', '123123');