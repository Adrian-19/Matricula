-- @MatriculaBD.sql

drop table Carrera cascade constraints;
drop table Curso cascade constraints;
drop table Profesor cascade constraints;
drop table Alumno cascade constraints;
drop table Ciclo cascade constraints;
drop table Grupo cascade constraints;
drop table Usuarios cascade constraints;
drop table Matriculas cascade constraints;

--        TABLES       -- TITLE

create table Carrera(
	codigo_carrera varchar2(50),
	nombre varchar2(50),
	titulo varchar2(50),
	constraints carrera_pk primary key (codigo_carrera)
);

-- 

create table Curso(
	codigo_carrera varchar2(50),
	numero_ciclo varchar2(50),
	codigo_curso varchar2(50),
	nombre varchar2(50),
	creditos number(1),
	horas_semanales number(3),
	constraints curso_pk primary key (codigo_curso)
);

--

create table Profesor(
	cedula_profesor varchar2(50),
	nombre varchar2(50),
	telefono varchar2(50),
	email varchar2(50),
	constraints profesor_pk primary key (cedula_profesor)
);

--

create table Alumno(
	cedula_alumno varchar2(50),
	nombre varchar2(50),
	telefono varchar2(50),
	email varchar2(50),
	fecha_nacimiento date,
	codigo_carrera varchar2(50),
	constraints alumno_pk primary key (cedula_alumno)
);

--

create table Ciclo(
	numero_ciclo varchar2(50),
	annio varchar2(50),
	numero varchar2(1),
	fecha_inicio date,
	fecha_final date,
	constraints ciclo_pk primary key (numero_ciclo)
);

--

create table Grupo(
	numero_grupo varchar2(50),
	numero_ciclo varchar2(50),
	codigo_curso varchar2 (50),
	cedula_profesor varchar2 (50),
	horario varchar2 (50),
	constraints grupo_pk primary key (numero_grupo)
);

--

create table Usuarios(
	cedula varchar2 (50),
	clave varchar2 (50),
	admin_ind varchar2 (1),
	matric_ind varchar2 (1),
	profesor_ind varchar2 (1),
	alumno_ind varchar2 (1),
	constraints usuarios_pk primary key (cedula)
);

create table Matriculas(
	numero_matricula varchar2(50),
	cedula_alumno varchar2 (50),
	numero_grupo varchar2 (50),
	nota varchar2 (50),
	constraints matricula_pk primary key (numero_matricula)
);

--        FOREIGN KEYS       -- TITLE

-- CURSO --
alter table Curso add constraint fk_curso_carrera
foreign key(codigo_carrera)
references Carrera(codigo_carrera);

alter table Curso add constraint fk_curso_ciclo
foreign key(numero_ciclo)
references Ciclo(numero_ciclo);

-- GRUPO --
alter table Grupo add constraint fk_grupo_curso
foreign key(codigo_curso)
references Curso (codigo_curso);

alter table Grupo add constraint fk_grupo_ciclo
foreign key(numero_ciclo)
references Ciclo (numero_ciclo);

alter table Grupo add constraint fk_grupo_profesor
foreign key (cedula_profesor)
references Profesor (cedula_profesor);

-- USUARIOS --
alter table Usuarios add constraint fk_usuarios_profesor
foreign key (cedula)
references Profesor (cedula_profesor);

alter table Usuarios add constraint fk_usuarios_alumno
foreign key (cedula)
references Alumno (cedula_alumno);

-- MATRICULAS --
alter table Matriculas add constraint fk_matriculas_alumno
foreign key (cedula_alumno)
references Alumno (cedula_alumno);

alter table Matriculas add constraint fk_matriculas_grupo
foreign key (numero_grupo)
references Grupo (numero_grupo);

--        PROCEDURES       -- TITLE

create or replace package types
as
type ref_cursor is ref cursor;
END;
/
show error

-- CARRERA --
-- INSERT
create or replace procedure insertar_carrera(codigo_carrera in carrera.codigo_carrera%type, nombre in carrera.nombre%type, titulo in carrera.titulo%type)
as
begin 
insert into Carrera values(codigo_carrera, nombre, titulo);
END;
/
show error

-- MODIFY
create or replace procedure modificar_carrera(n_codigo_carrera in curso.codigo_carrera%type, n_nombre in curso.nombre%type, n_titulo in carrera.titulo%type)
as
begin
update Carrera set nombre = n_nombre, titulo = n_titulo where codigo_carrera = n_codigo_carrera;
END;
/
show error

-- DELETE
create or replace procedure eliminar_carrera(e_codigo_carrera in carrera.codigo_carrera%type)
as
begin
delete from carrera where codigo_carrera = e_codigo_carrera;
END;
/
show error

-- SEARCH
create or replace function buscar_carrera(s_codigo_carrera in carrera.codigo_carrera%type)
return types.ref_cursor
as
cursor_carrera types.ref_cursor;
begin 
open cursor_carrera for
select codigo_carrera, nombre, titulo from Carrera where codigo_carrera = s_codigo_carrera;
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
select codigo_carrera, nombre, titulo from carrera;
return cursor_carrera;
END;
/
show error


-- CURSO -- 
-- INSERT
create or replace procedure insertar_curso(codigo_curso in curso.codigo_curso%type, codigo_carrera in curso.codigo_carrera%type, num_ciclo in curso.numero_ciclo%type, nombre in curso.nombre%type, creditos in curso.creditos%type, horas_semanales in curso.horas_semanales%type)
as
begin 
insert into Curso values(codigo_curso, codigo_carrera, num_ciclo, nombre, creditos, horas_semanales);
END;
/
show error

-- MODIFY
-- create or replace procedure modificar_carrera(n_codigo_carrera in curso.codigo_carrera%type, n_nombre in curso.nombre%type, n_titulo in carrera.titulo%type)
-- as
-- begin
-- update 

-- DELETE
create or replace procedure eliminar_curso(e_codigo_curso in curso.codigo_curso%type)
as
begin
delete from Curso where codigo_curso = e_codigo_curso;
END;
/
show error

-- SEARCH
create or replace function buscar_curso(s_codigo_curso in curso.codigo_curso%type)
return types.ref_cursor
as
cursor_curso types.ref_cursor;
begin
open cursor_curso for
select codigo_curso, codigo_carrera, numero_ciclo, nombre, creditos, horas_semanales from Curso where codigo_curso = s_codigo_curso;
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
select codigo_curso, codigo_carrera, numero_ciclo, nombre, creditos, horas_semanales from curso;
return cursor_curso;
END;
/
show error

-- PROFESOR --
-- INSERT
create or replace procedure insertar_profesor(cedula_profesor in profesor.cedula_profesor%type, nombre in profesor.nombre%type, telefono in profesor.telefono%type, email in profesor.email%type)
as
begin
insert into Profesor values(cedula_profesor, nombre, telefono, email);
END;
/
show error

-- MODIFY
create or replace procedure modificar_profesor(n_cedula_profesor in profesor.cedula_profesor%type, n_nombre in profesor.nombre%type, n_telefono in profesor.telefono%type, n_email in profesor.email%type)
as
begin
update Profesor set nombre = n_nombre, telefono = n_telefono, email = n_email where cedula_profesor = n_cedula_profesor;
END;
/
show error

-- DELETE
create or replace procedure eliminar_profesor(e_cedula_profesor in profesor.cedula_profesor%type)
as
begin
delete from profesor where cedula_profesor=e_cedula_profesor;
END;
/
show error

-- SEARCH
create or replace function buscar_profesor(s_cedula_profesor in profesor.cedula_profesor%type)
return types.ref_cursor
as
cursor_profesor types.ref_cursor;
begin
open cursor_profesor for
select cedula_profesor, nombre, telefono, email from profesor where cedula_profesor = s_cedula_profesor;
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
select cedula_profesor, nombre, telefono, email from profesor;
return cursor_profesor;
END;
/
show error


-- ALUMNO --
-- INSERT
create or replace procedure insertar_alumno(cedula_alumno in alumno.cedula_alumno%type, nombre in alumno.nombre%type, telefono in alumno.telefono%type, email in alumno.email%type, fecha_nacimiento in alumno.fecha_nacimiento%type, carrera in alumno.codigo_carrera%type)
as
begin
insert into Alumno values(cedula_alumno, nombre, telefono, email, fecha_nacimiento, carrera);
END;
/
show error

-- MODIFY
create or replace procedure modificar_alumno(n_cedula_alumno in alumno.cedula_alumno%type, n_nombre in alumno.nombre%type, n_telefono in alumno.telefono%type, n_email in alumno.email%type, n_fecha_nacimiento in alumno.fecha_nacimiento%type, n_carrera in alumno.codigo_carrera%type)
as
begin
update alumno set nombre=n_nombre,telefono=n_telefono,email=n_email,fecha_nacimiento=n_fecha_nacimiento,codigo_carrera=n_carrera where cedula_alumno = n_cedula_alumno;
END;
/
show error

-- DELETE
create or replace procedure eliminar_alumno(n_cedula_alumno in alumno.cedula_alumno%type)
as
begin
delete from alumno where cedula_alumno=n_cedula_alumno;
END;
/
show error

-- SEARCH
create or replace function buscar_alumno(s_cedula_alumno in alumno.cedula_alumno%type)
return types.ref_cursor
as
cursor_alumno types.ref_cursor;
begin
open cursor_alumno for
select cedula_alumno, nombre, telefono, email, fecha_nacimiento, codigo_carrera from alumno where cedula_alumno = s_cedula_alumno;
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
select cedula_alumno, nombre, telefono, email, fecha_nacimiento, codigo_carrera from alumno;
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
select numero_ciclo, annio, numero, fecha_inicio, fecha_final from ciclo;
return cursor_ciclo;
END;
/
show error
