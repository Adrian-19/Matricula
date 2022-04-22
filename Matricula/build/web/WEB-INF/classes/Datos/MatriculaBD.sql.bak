-- @MatriculaBD.sql

set linesize 200
set pagesize 200
host cls

drop table Carrera cascade constraints;
drop table Curso cascade constraints;
drop table Profesor cascade constraints;
drop table Alumno cascade constraints;
drop table Ciclo cascade constraints;
drop table Grupo cascade constraints;
drop table Usuario cascade constraints;
drop table matricula cascade constraints;

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
	id varchar2(5),
	codigo varchar2(5),
	nombre varchar2(50),
	titulo varchar2(20),
	constraints carrera_pk primary key (id)
);

-- 

create table Curso(
	id varchar2(5),
	codigo varchar2(5),
	carreraId varchar2(5),
	cicloId varchar2(5),
	nombre varchar2(50),
	creditos number(1),
	horasSemanales number(3),
	constraints curso_pk primary key (id)
);

--

create table Profesor(
	id varchar2(5),
	cedula varchar2(15),
	nombre varchar2(50),
	telefono varchar2(20),
	email varchar2(50),
	constraints profesor_pk primary key (id)
);

--

create table Alumno(
	id varchar2(5),
	cedula varchar2(15),
	nombre varchar2(50),
	telefono varchar2(20),
	email varchar2(50),
	fechaNacimiento date,
	carreraId varchar2(5),
	constraints alumno_pk primary key (id)
);

--

create table Ciclo(
	id varchar2(5),
	annio varchar2(6),
	numero varchar2(1),
	fechaInicio date,
	fechaFinal date,
	activo number(1),
	constraints ciclo_pk primary key (id)
);
ALTER TABLE Ciclo
ADD CONSTRAINT annio_ciclo UNIQUE (annio, numero);
--

create table Grupo(
	id varchar2(5),
	numeroGrupo varchar2(10),
	cicloId varchar2(5),
	cursoId varchar2 (5),
	profesorId varchar2 (5),
	horario varchar2 (50),
	constraints grupo_pk primary key (id)
);

--

create table Usuario(
	id varchar2(5),
	cedula varchar2 (15),
	clave varchar2 (20),
	rol number (1),
	constraints usuario_pk primary key (id)
);

create table Matricula(
	id varchar2(5),
	numero varchar2(5),
	alumnoId varchar2 (5),
	grupoId varchar2 (5),
	nota varchar2 (5),
	constraints matriculas_pk primary key (id)
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

-- matricula --
alter table matricula add constraint fk_matriculas_alumno
foreign key (alumnoId)
references Alumno (id);

alter table matricula add constraint fk_matriculas_grupo
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
create or replace procedure insertar_curso(codigo in curso.codigo%type, carreraId in curso.carreraId%type, num_ciclo in curso.cicloId%type, nombre in curso.nombre%type, creditos in curso.creditos%type, horasSemanales in curso.horasSemanales%type)
as
begin 
insert into Curso values(curso_sequence.nextval, codigo, carreraId, num_ciclo, nombre, creditos, horasSemanales);
END;
/
show error

-- MODIFY
create or replace procedure modificar_curso(n_id in curso.id%type, n_codigo in curso.codigo%type, n_carreraId in curso.carreraId%type, n_cicloId in curso.cicloId%type, n_nombre in curso.nombre%type, n_creditos in curso.creditos%type, n_horasSemanales in curso.horasSemanales%type)
as
begin
update Curso set codigo = n_codigo, carreraId=n_carreraId, cicloId=n_cicloId, nombre = n_nombre, creditos = n_creditos, horasSemanales = n_horasSemanales where id = n_id;
END;
/
show error

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
select id, codigo, carreraId, cicloId, nombre, creditos, horasSemanales from Curso where id = s_id;
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
select curso.id, curso.codigo, curso.carreraId, curso.cicloId, curso.nombre, curso.creditos, curso.horasSemanales, carrera.codigo carreraCodigo, carrera.nombre carreraNombre, carrera.titulo carreraTitulo, ciclo.annio cicloAnnio, ciclo.numero cicloNumero, ciclo.fechaInicio cicloFechaInicio, ciclo.fechaFinal cicloFechaFinal, ciclo.activo cicloActivo
from ((Curso
inner join Carrera on curso.carreraId = carrera.id)
inner join Ciclo on curso.cicloId = ciclo.id);
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
create or replace function buscar_profesor(s_cedula in profesor.cedula%type)
return types.ref_cursor
as
cursor_profesor types.ref_cursor;
begin
open cursor_profesor for
select id, cedula , nombre, telefono, email from profesor where cedula = s_cedula;
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
create or replace procedure insertar_alumno(cedula in alumno.cedula%type, nombre in alumno.nombre%type, telefono in alumno.telefono%type, email in alumno.email%type, fechaNacimiento in alumno.fechaNacimiento%type, carrera in alumno.carreraId%type)
as
begin
insert into Alumno values(alumno_sequence.nextval, cedula, nombre, telefono, email, fechaNacimiento, carrera);
END;
/
show error

-- MODIFY
create or replace procedure modificar_alumno(n_id in alumno.id%type, n_cedula in alumno.cedula%type, n_nombre in alumno.nombre%type, n_telefono in alumno.telefono%type, n_email in alumno.email%type, n_fechaNacimiento in alumno.fechaNacimiento%type, n_carrera in alumno.carreraId%type)
as
begin
update alumno set cedula = n_cedula, nombre=n_nombre,telefono=n_telefono,email=n_email,fechaNacimiento=n_fechaNacimiento,carreraId=n_carrera where id = n_id;
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
select id, cedula, nombre, telefono, email, fechaNacimiento, carreraId from alumno where id = s_id;
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
select id, cedula, nombre, telefono, email, fechaNacimiento, carreraId from alumno;
return cursor_alumno;
END;
/
show error

-- CICLOS --
-- LIST

create or replace procedure insertar_ciclo(i_annio in ciclo.annio%type, i_numero in ciclo.numero%type, i_fechaInicio in ciclo.fechaInicio%type, i_fechaFinal in ciclo.fechaFinal%type, i_activo in ciclo.activo%type)
as 
begin 
insert into Ciclo values(ciclo_sequence.nextval, i_annio, i_numero, i_fechaInicio, i_fechaFinal, i_activo);
END;
/
show error

create or replace function listar_ciclo
return types.ref_cursor
as
cursor_ciclo types.ref_cursor;
begin 
open cursor_ciclo for
select id, annio, numero, fechaInicio, fechaFinal, activo from ciclo;
return cursor_ciclo;
END;
/
show error

-- GRUPO --
-- INSERT

create or replace procedure insertar_grupo(i_numeroGrupo in grupo.numeroGrupo%type, i_cicloId in grupo.cicloId%type, i_cursoId in grupo.cursoId%type, i_profesorId in grupo.profesorId%type, i_horario in grupo.horario%type)
as 
begin 
insert into Grupo values(grupo_sequence.nextval, i_numeroGrupo, i_cicloId, i_cursoId, i_profesorId, i_horario);
END;
/
show error

-- LIST
-- create or replace function listar_grupo
-- return types.ref_cursor
-- as
-- cursor_grupo types.ref_cursor;
-- begin
-- open cursor_grupo for
-- select *
-- from (((Grupo
-- inner join Ciclo on grupo.cicloId = ciclo.id)
-- inner join Curso on grupo.cursoId = curso.id)
-- inner join Profesor on grupo.profesorId = profesor.id);
-- return cursor_grupo;
-- END;
-- /
-- show error

-- USUARIO --
-- INSERT
create or replace procedure insertar_usuario(i_cedula in usuario.cedula%type, i_clave in usuario.clave%type, i_rol in usuario.rol%type)
as
begin
insert into usuario values(usuario_sequence.nextval, i_cedula, i_clave, i_rol);
END;
/
show error

-- SEARCH
create or replace function buscar_usuario(s_cedula in usuario.cedula%type)
return types.ref_cursor
as
cursor_usuario types.ref_cursor;
begin
open cursor_usuario for 
select id, cedula, clave, rol from usuario where cedula = s_cedula;
return cursor_usuario;
END;
/
show error


-- MATRICULA --
-- INSERT
create or replace procedure insertar_matricula(i_numero in matricula.numero%type, i_alumnoId in matricula.alumnoId%type, i_grupoId in matricula.grupoId%type, i_nota in matricula.nota%type)
as
begin
insert into matricula values(matricula_sequence.nextval, i_numero, i_alumnoId, i_grupoId, i_nota);
END;
/
show error 


-- LIST
create or replace function listar_cursos_estudiantes(s_alumnoId in matricula.alumnoId%type)
return types.ref_cursor
as
cursor_matricula types.ref_cursor;
begin
open cursor_matricula for
select curso.id, curso.codigo, curso.carreraId, curso.cicloId, curso.nombre, curso.creditos, curso.horasSemanales
from ((Matricula
inner join Grupo on matricula.grupoId = grupo.id)
inner join Curso on grupo.cicloId = curso.id)
where matricula.alumnoId = s_alumnoId;
return cursor_matricula;
END;
/
show error


--        TEST DATA       -- TITLE

exec insertar_ciclo('2020', '1', to_date('06/03/2020', 'DD/MM/YYYY'), to_date('06/07/2020', 'DD/MM/YYYY'), 0);
exec insertar_ciclo('2021', '1', to_date('06/03/2021', 'DD/MM/YYYY'), to_date('06/07/2021', 'DD/MM/YYYY'), 0);
exec insertar_ciclo('2021', '2', to_date('06/08/2021', 'DD/MM/YYYY'), to_date('06/11/2021', 'DD/MM/YYYY'), 0);
exec insertar_ciclo('2022', '1', to_date('06/03/2022', 'DD/MM/YYYY'), to_date('06/07/2022', 'DD/MM/YYYY'), 1);

exec insertar_carrera('EIF', 'Ingenieria en Sistemas', 'Bachillerato');
exec insertar_carrera('BIO', 'Biologia', 'Bachillerato');
exec insertar_carrera('LIX', 'Ensenanza del Ingles', 'Bachillerato');
exec insertar_carrera('MAT', 'Ensenanza de la Matematica', 'Bachillerato');
exec insertar_carrera('DEP', 'Deportes', 'Bachillerato');

exec insertar_curso('123','1', '1', 'Fundamentos de Informatica', 4, 8);
exec insertar_curso('456','2', '1', 'Quimica Organica I', 4, 8);
exec insertar_curso('678','2', '1', 'Quimica Inorganica I', 4, 8); 
-- 3
exec insertar_curso('910','3', '2', 'Elocucion', 4, 8);
exec insertar_curso('111','4', '2', 'Geometria Analitica', 4, 8);
exec insertar_curso('222','3', '2', 'Gramatica Basica', 3, 6);
-- 6
exec insertar_curso('333','1', '3', 'Programacion III', 4, 8);
exec insertar_curso('444','4', '3', 'Geometria Euclidea II', 3, 6);
exec insertar_curso('555','4', '3', 'Educacion General', 3, 6);
-- 9
exec insertar_curso('666','4', '4', 'Geometria Euclidea I', 4, 8);
exec insertar_curso('777','1', '4', 'Programacion III', 4, 8);
exec insertar_curso('888','1', '4', 'Paradigmas de Programacion', 4, 8);
exec insertar_curso('999','2', '4', 'Bioquimica', 4, 8);
exec insertar_curso('122','3', '4', 'Composicion', 4, 8);
exec insertar_curso('133','4', '4', 'Algebra Lineal', 4, 8);
-- 15

exec insertar_profesor('11112222', 'Jorge Mendez', '12345678', 'jorge@gmail.com');
exec insertar_profesor('11113333', 'Nancy Munoz', '12345678', 'nancy@gmail.com');
exec insertar_profesor('11114444', 'Carlos Hernandez', '12345678', 'carlos@gmail.com');
exec insertar_profesor('11115555', 'Karla Jimenez', '12345678', 'karla@gmail.com');

exec insertar_alumno('22223333', 'Danny Hernandez', '12345678', 'danny@gmail.com', to_date('06/07/2000', 'DD/MM/YYYY'), '1');
exec insertar_alumno('22224444', 'Sussett Alvarado', '12345678', 'suss@gmail.com', to_date('06/07/2000', 'DD/MM/YYYY'), '1');
exec insertar_alumno('22225555', 'Joselin Perez', '12345678', 'joss@gmail.com', to_date('06/07/2000', 'DD/MM/YYYY'), '2');
exec insertar_alumno('22226666', 'David Rodriguez', '12345678', 'enano@gmail.com', to_date('06/07/2000', 'DD/MM/YYYY'), '2');
exec insertar_alumno('22227777', 'Sidiana Hernandez', '12345678', 'sidix@gmail.com', to_date('06/07/2000', 'DD/MM/YYYY'), '3');
exec insertar_alumno('22228888', 'Jafeth Ledezma', '12345678', 'jerry@gmail.com', to_date('06/07/2000', 'DD/MM/YYYY'), '3');
exec insertar_alumno('22229999', 'Samantha Garro', '12345678','sachi@gmail.com', to_date('06/07/2000', 'DD/MM/YYYY'), '4');
exec insertar_alumno('22221010', 'Angie Torres', '12345678', 'nucita@gmail.com', to_date('06/07/2000', 'DD/MM/YYYY'), '4');

exec insertar_grupo('1', '4', '10', '1', '5:00 - 6:00p.m');
exec insertar_grupo('2', '4', '11', '1', '7:00 - 8:00p.m');
exec insertar_grupo('3', '4', '12', '2', '7:00 - 8:00p.m');
exec insertar_grupo('1', '3', '7', '3', '7:00 - 8:00p.m');
exec insertar_grupo('5', '3', '8', '3', '5:00 - 6:00p.m');
exec insertar_grupo('6', '2', '9', '4', '5:00 - 6:00p.m');
exec insertar_grupo('9', '1', '1', '4', '5:00 - 6:00p.m');

exec insertar_matricula('M1','1','1',null);

exec insertar_usuario('22223333', '1234', '4');
exec insertar_usuario('22224444', '1234', '4');
exec insertar_usuario('22225555', '1234', '4');
exec insertar_usuario('22226666', '1234', '4');
exec insertar_usuario('22227777', '1234', '4');
exec insertar_usuario('22228888', '1234', '4');
exec insertar_usuario('22229999', '1234', '4');
exec insertar_usuario('22221010', '1234', '4');
exec insertar_usuario('11112222', '1234', '3');
exec insertar_usuario('11113333', '1234', '3');
exec insertar_usuario('11114444', '1234', '3');
exec insertar_usuario('11115555', '1234', '3');
exec insertar_usuario('1111', '1234', '1');
exec insertar_usuario('2222', '1234', '2');

commit;
