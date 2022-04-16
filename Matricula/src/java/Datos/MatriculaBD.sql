-- @MatriculaBD.sql

drop table Carrera cascade constraints;
drop table Curso cascade constraints;
drop table Profesor cascade constraints;
drop table Alumno cascade constraints;
drop table Ciclo cascade constraints;
drop table Grupo cascade constraints;
drop table Usuarios cascade constraints;
drop table Matriculas cascade constraints;

drop sequence carrera_sequence;
drop sequence curso_sequence;
drop sequence profesor_sequence;
drop sequence alumno_sequence;
drop sequence ciclo_sequence;
drop sequence grupo_sequence;
drop sequence usuario_sequence;
drop sequence matricula_sequence;


--        TABLES       -- TITLE

create table Carrera(
	id varchar2(50),
	codigo varchar2(50),
	nombre varchar2(50),
	titulo varchar2(50),
	constraints carrera_pk primary key (id)
);

-- 

create table Curso(
	id varchar2(50),
	carreraId varchar2(50),
	cicloId varchar2(50),
	nombre varchar2(50),
	creditos number(1),
	horas_semanales number(3),
	constraints curso_pk primary key (id)
);

--

create table Profesor(
	id varchar2(50),
	cedula varchar2(50),
	nombre varchar2(50),
	telefono varchar2(50),
	email varchar2(50),
	constraints profesor_pk primary key (id)
);

--

create table Alumno(
	id varchar2(50),
	nombre varchar2(50),
	telefono varchar2(50),
	email varchar2(50),
	fecha_nacimiento date,
	carreraId varchar2(50),
	constraints alumno_pk primary key (id)
);

--

create table Ciclo(
	id varchar2(50),
	annio varchar2(50),
	numero varchar2(1),
	fecha_inicio date,
	fecha_final date,
	constraints ciclo_pk primary key (id)
);
ALTER TABLE Ciclo
ADD CONSTRAINT annio_ciclo UNIQUE (annio, numero);
--

create table Grupo(
	id varchar2(50),
	numero_grupo varchar2(50),
	cicloId varchar2(50),
	cursoId varchar2 (50),
	profesorId varchar2 (50),
	horario varchar2 (50),
	constraints grupo_pk primary key (id)
);

--

create table Usuarios(
	id varchar2(50),
	cedula varchar2 (50),
	clave varchar2 (50),
	admin_ind varchar2 (1),
	matric_ind varchar2 (1),
	profesor_ind varchar2 (1),
	alumno_ind varchar2 (1),
	constraints usuarios_pk primary key (id)
);

create table Matriculas(
	id varchar2(50),
	numero varchar2(50),
	alumnoId varchar2 (50),
	grupoId varchar2 (50),
	nota varchar2 (50),
	constraints matricula_pk primary key (id)
);

--        FOREIGN KEYS       -- TITLE

-- CURSO --
alter table Curso add constraint fk_curso_carrera
foreign key(carreraId)
references Carrera(id);

alter table Curso add constraint fk_curso_ciclo
foreign key(cicloId)
references Ciclo(id);

-- GRUPO --
alter table Grupo add constraint fk_grupo_curso
foreign key(cursoId)
references Curso (id);

alter table Grupo add constraint fk_grupo_ciclo
foreign key(cicloId)
references Ciclo (id);

alter table Grupo add constraint fk_grupo_profesor
foreign key (profesorId)
references Profesor (id);

-- USUARIOS --
alter table Usuarios add constraint fk_usuarios_profesor
foreign key (cedula)
references Profesor (id);

alter table Usuarios add constraint fk_usuarios_alumno
foreign key (cedula)
references Alumno (id);

-- MATRICULAS --
alter table Matriculas add constraint fk_matriculas_alumno
foreign key (alumnoId)
references Alumno (id);

alter table Matriculas add constraint fk_matriculas_grupo
foreign key (grupoId)
references Grupo (id);


--        SEQUENCES       -- TITLE

create sequence carrera_sequence;
create sequence curso_sequence;
create sequence profesor_sequence;
create sequence alumno_sequence;
create sequence ciclo_sequence;
create sequence grupo_sequence;
create sequence usuario_sequence;
create sequence matricula_sequence;


--        PROCEDURES       -- TITLE

create or replace package types
as
type ref_cursor is ref cursor;
END;
/
show error

-- CARRERA --
-- INSERT
create or replace procedure insertar_carrera(i_codigo in carrera.codigo%type, i_nombre in carrera.nombre%type, i_titulo in carrera.titulo%type)
as
begin 
insert into Carrera values(carrera_sequence.nextval ,i_codigo, i_nombre, i_titulo);
END;
/
show error

-- MODIFY
create or replace procedure modificar_carrera(n_id in carrera.id%type, n_codigo in carrera.codigo%type, n_nombre in carrera.nombre%type, n_titulo in carrera.titulo%type)
as
begin
update Carrera set codigo = n_codigo, nombre = n_nombre, titulo = n_titulo where id = n_id;
END;
/
show error

-- DELETE
create or replace procedure eliminar_carrera(e_id in carrera.id%type)
as
begin
delete from carrera where id = e_id;
END;
/
show error

-- SEARCH
create or replace function buscar_carrera(s_id in carrera.id%type)
return types.ref_cursor
as
cursor_carrera types.ref_cursor;
begin 
open cursor_carrera for
select id, codigo, nombre, titulo from Carrera where codigo = s_id;
return cursor_carrera;
END;
/
show error

-- LIST 
create or replace function listar_carrera
return types.ref_cursor
as
cursor_carrera types.ref_cursor;
begin
open cursor_carrera for
select id, codigo, nombre, titulo from carrera;
return cursor_carrera;
END;
/
show error


-- CURSO -- 
-- INSERT
create or replace procedure insertar_curso(id in curso.id%type, carreraId in curso.carreraId%type, num_ciclo in curso.cicloId%type, nombre in curso.nombre%type, creditos in curso.creditos%type, horas_semanales in curso.horas_semanales%type)
as
begin 
insert into Curso values(id, carreraId, num_ciclo, nombre, creditos, horas_semanales);
END;
/
show error

-- MODIFY
-- create or replace procedure modificar_carrera(n_codigo in curso.codigo%type, n_nombre in curso.nombre%type, n_titulo in carrera.titulo%type)
-- as
-- begin
-- update 

-- DELETE
create or replace procedure eliminar_curso(e_id in curso.id%type)
as
begin
delete from Curso where id = e_id;
END;
/
show error

-- SEARCH
create or replace function buscar_curso(s_id in curso.id%type)
return types.ref_cursor
as
cursor_curso types.ref_cursor;
begin
open cursor_curso for
select id, carreraId, cicloId, nombre, creditos, horas_semanales from Curso where id = s_id;
return cursor_curso;
END;
/
show error

-- LIST
create or replace function listar_curso
return types.ref_cursor
as
cursor_curso types.ref_cursor;
begin
open cursor_curso for
select id, carreraId, cicloId, nombre, creditos, horas_semanales from curso;
return cursor_curso;
END;
/
show error

-- PROFESOR --
-- INSERT
create or replace procedure insertar_profesor(cedula in profesor.cedula%type, nombre in profesor.nombre%type, telefono in profesor.telefono%type, email in profesor.email%type)
as
begin
insert into Profesor values(profesor_sequence.nextval,cedula, nombre, telefono, email);
END;
/
show error

-- MODIFY
create or replace procedure modificar_profesor(n_id in profesor.id%type, n_cedula in profesor.cedula%type, n_nombre in profesor.nombre%type, n_telefono in profesor.telefono%type, n_email in profesor.email%type)
as
begin
update Profesor set nombre = n_nombre, telefono = n_telefono, email = n_email where id = n_id;
END;
/
show error

-- DELETE
create or replace procedure eliminar_profesor(e_id in profesor.id%type)
as
begin
delete from profesor where id=e_id;
END;
/
show error

-- SEARCH
create or replace function buscar_profesor(s_id in profesor.id%type)
return types.ref_cursor
as
cursor_profesor types.ref_cursor;
begin
open cursor_profesor for
select id, cedula , nombre, telefono, email from profesor where id = s_id;
return cursor_profesor;
END;
/
show error

-- LIST
create or replace function listar_profesor
return types.ref_cursor
as
cursor_profesor types.ref_cursor;
begin
open cursor_profesor for
select id, cedula, nombre, telefono, email from profesor;
return cursor_profesor;
END;
/
show error


-- ALUMNO --
-- INSERT
create or replace procedure insertar_alumno(id in alumno.id%type, nombre in alumno.nombre%type, telefono in alumno.telefono%type, email in alumno.email%type, fecha_nacimiento in alumno.fecha_nacimiento%type, carrera in alumno.carreraId%type)
as
begin
insert into Alumno values(id, nombre, telefono, email, fecha_nacimiento, carrera);
END;
/
show error

-- MODIFY
create or replace procedure modificar_alumno(n_id in alumno.id%type, n_nombre in alumno.nombre%type, n_telefono in alumno.telefono%type, n_email in alumno.email%type, n_fecha_nacimiento in alumno.fecha_nacimiento%type, n_carrera in alumno.carreraId%type)
as
begin
update alumno set nombre=n_nombre,telefono=n_telefono,email=n_email,fecha_nacimiento=n_fecha_nacimiento,carreraId=n_carrera where id = n_id;
END;
/
show error

-- DELETE
create or replace procedure eliminar_alumno(n_id in alumno.id%type)
as
begin
delete from alumno where id=n_id;
END;
/
show error

-- SEARCH
create or replace function buscar_alumno(s_id in alumno.id%type)
return types.ref_cursor
as
cursor_alumno types.ref_cursor;
begin
open cursor_alumno for
select id, nombre, telefono, email, fecha_nacimiento, carreraId from alumno where id = s_id;
return cursor_alumno;
END;
/
show error

-- LIST
create or replace function listar_alumno
return types.ref_cursor
as
cursor_alumno types.ref_cursor;
begin
open cursor_alumno for
select id, nombre, telefono, email, fecha_nacimiento, carreraId from alumno;
return cursor_alumno;
END;
/
show error

-- CICLOS --
-- LIST
create or replace function listar_ciclo
return types.ref_cursor
as
cursor_ciclo types.ref_cursor;
begin 
open cursor_ciclo for
select id, annio, numero, fecha_inicio, fecha_final from ciclo;
return cursor_ciclo;
END;
/
show error
