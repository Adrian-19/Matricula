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
drop table rol cascade constraints;
drop table PlanDeEstudio cascade constraints;
drop table OfertaAcademica cascade constraints;


drop sequence carrera_sequence;
drop sequence curso_sequence;
drop sequence profesor_sequence;
drop sequence alumno_sequence;
drop sequence ciclo_sequence;
drop sequence grupo_sequence;
drop sequence usuario_sequence;
drop sequence matricula_sequence;
drop sequence rol_sequence;
drop sequence ofertaAcademica_sequence;
drop sequence planDeEstudio_sequence;


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
	nombre varchar2(50) UNIQUE,
	creditos number(1),
	horasSemanales number(3),
	constraints curso_pk primary key (id)
);

--
create table OfertaAcademica(
	id varchar2(5),
	carreraId varchar2(5),
	grupoId varchar2(5),
	constraints ofertaAcademica_pk primary key (id)
);

--

create table PlanDeEstudio(
	id varchar2(5),
	carreraId varchar2(5),
	cursoId varchar2(5),
	constraints planDeEstudio_pk primary key (id)
);


--

create table Profesor(
	id varchar2(5),
	cedula varchar2(15) UNIQUE,
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
	rol varchar2(5),
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

create table Rol (
	id varchar2(5),
	rol varchar2 (50),
	constraints roles_pk primary key (id)
);


--        FOREIGN KEYS       -- TITLE

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

-- usuario --
alter table Usuario add constraint fk_usuario_rol
foreign key (rol)
references Rol (id);

-- OfertaAcademica --
alter table ofertaAcademica add constraint fk_ofertaAcademica_carrera
foreign key (carreraId)
references Carrera (id);

alter table ofertaAcademica add constraint fk_ofertaAcademica_grupo
foreign key (grupoId)
references Grupo (id);

-- PlanDeEstudio --
alter table planDeEstudio add constraint fk_planDeEstudio_carrera
foreign key (carreraId)
references Carrera (id);

alter table planDeEstudio add constraint fk_planDeEstudio_curso
foreign key (cursoId)
references curso (id);

--        SEQUENCES       -- TITLE

create sequence carrera_sequence;
create sequence curso_sequence;
create sequence profesor_sequence;
create sequence alumno_sequence;
create sequence ciclo_sequence;
create sequence grupo_sequence;
create sequence usuario_sequence;
create sequence matricula_sequence;
create sequence rol_sequence;
create sequence ofertaAcademica_sequence;
create sequence planDeEstudio_sequence;


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
create or replace procedure insertar_curso(codigo in curso.codigo%type, nombre in curso.nombre%type, creditos in curso.creditos%type, horasSemanales in curso.horasSemanales%type)
as
begin 
insert into Curso values(curso_sequence.nextval, codigo, nombre, creditos, horasSemanales);
END;
/
show error

-- MODIFY
create or replace procedure modificar_curso(n_id in curso.id%type, n_codigo in curso.codigo%type, n_nombre in curso.nombre%type, n_creditos in curso.creditos%type, n_horasSemanales in curso.horasSemanales%type)
as
begin
update Curso set codigo = n_codigo, nombre = n_nombre, creditos = n_creditos, horasSemanales = n_horasSemanales where id = n_id;
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
select id, codigo, nombre, creditos, horasSemanales from Curso where id = s_id;
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
select *
from curso;
return cursor_curso;
END;
/
show error


-- PlanDeEstudio --
-- GETALLBYCARRERA -- Mantenimiento de carreras -> sustituye listarCursoCarrera
create or replace function listar_planDeEstudio_carrera(c_id in PlanDeEstudio.carreraId%type)
return types.ref_cursor
as
cursor_planDeEstudio types.ref_cursor;
begin
open cursor_planDeEstudio for
select id, carreraId, cursoId, curso.codigo codigoCurso, curso.nombre cursoNombre, curso.creditos cursoCreditos, curso.horasSemanales cursoHorasSemanales, carrera.codigo carreraCodigo, carrera.nombre carreraNombre, carrera.titulo carreraTitulo
from ((PlanDeEstudio
inner join Carrera on planDeEstudio.carreraId = carrera.id)
inner join Curso on planDeEstudio.cursoId = curso.id)
where PlanDeEstudio.carreraId = c_id;
return cursor_planDeEstudio;
END;
/
show error

-- INSERT
create or replace procedure insertar_planDeEstudio(carreraId in planDeEstudio.carreraId%type, cursoId in planDeEstudio.cursoId%type)
as
begin 
insert into PlanDeEstudio values(planDeEstudio_sequence.nextval, carreraId, cursoId);
END;
/
show error

-- MODIFY
create or replace procedure modificar_planDeEstudio(n_id in planDeEstudio.id%type, n_carreraId in planDeEstudio.carreraId%type, n_cursoId in planDeEstudio.cursoId%type)
as
begin
update planDeEstudio set carreraId = n_carreraId, cursoId = n_cursoId where id = n_id;
END;
/
show error

-- DELETE
create or replace procedure eliminar_planDeEstudio(e_id in planDeEstudio.cursoId%type)
as
begin
delete from planDeEstudio where cursoId = e_id;
END;
/
show error


-- OfertaAcademica --
-- GetAllGruposByCicloAndCarrera -- Oferta Academica -- sustituye listar_curso_carrera_ciclo

create or replace function listar_ofertaAcademica_ciclo(carrera_id in ofertaAcademica.carreraId%type, ciclo_id in grupo.cicloId%type)
return types.ref_cursor
as
cursor_ofertaAcademica types.ref_cursor;
begin
open cursor_ofertaAcademica for
select id, carreraId, grupoId, carrera.id carreraId, carrera.codigo carreraCodigo, carrera.nombre carreraNombre, carrera.titulo carreraTitulo, grupo.numeroGrupo grupoNumeroGrupo, grupo.cicloId grupoCicloId, grupo.cursoId grupoCursoId, grupo.profesorId grupoProfesorId, grupo.horario grupoHorario
from ((OfertaAcademica
inner join Carrera on ofertaAcademica.carreraId = carrera.id)
inner join Grupo on ofertaAcademica.grupoId = grupo.id)
where ofertaAcademica.carreraId = carrera_id and grupo.cicloId=ciclo_id;
return cursor_ofertaAcademica;
END;
/
show error

-- INSERT
create or replace procedure insertar_ofertaAcademica(carreraId in ofertaAcademica.carreraId%type, grupoId in ofertaAcademica.grupoId%type)
as
begin 
insert into ofertaAcademica values(ofertaAcademica_sequence.nextval, carreraId, grupoId);
END;
/
show error

-- MODIFY
create or replace procedure modificar_ofertaAcademica(n_id in ofertaAcademica.id%type, n_carreraId in ofertaAcademica.carreraId%type, n_grupoId in ofertaAcademica.grupoId%type)
as
begin
update ofertaAcademica set carreraId = n_carreraId, grupoId = n_grupoId where id = n_id;
END;
/
show error

-- DELETE
create or replace procedure eliminar_ofertaAcademica(e_id in curso.id%type)
as
begin
delete from ofertaAcademica where id = e_id;
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
update Profesor set cedula = n_cedula, nombre = n_nombre, telefono = n_telefono, email = n_email where id = n_id;
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

create or replace procedure eliminar_alumno_matriculado(n_id in alumno.id%type)
as
begin
delete from matricula where matricula.alumnoId=n_id;
END;
/
show error


-- SEARCH
create or replace function buscar_alumno(s_cedula in alumno.cedula%type)
return types.ref_cursor
as
cursor_alumno types.ref_cursor;
begin
open cursor_alumno for
select alumno.id alumnoId, alumno.cedula alumnoCedula, alumno.nombre alumnoNombre, alumno.telefono alumnoTelefono, alumno.email alumnoEmail, alumno.fechaNacimiento alumnoFechaNacimiento,
carrera.id carreraId,carrera.codigo carreraCodigo, carrera.nombre carreraNombre, carrera.titulo carreraTitulo 
from Alumno inner join Carrera on alumno.carreraId = carrera.id and alumno.cedula = s_cedula; 
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
select alumno.id alumnoId, alumno.cedula alumnoCedula, alumno.nombre alumnoNombre, alumno.telefono alumnoTelefono, alumno.email alumnoEmail, alumno.fechaNacimiento alumnoFechaNacimiento,
carrera.id carreraId,carrera.codigo carreraCodigo, carrera.nombre carreraNombre, carrera.titulo carreraTitulo 
from Alumno inner join Carrera on alumno.carreraId = carrera.id order by alumno.id; 
return cursor_alumno;
END;
/
show error

-- create or replace function listar_cursos_alumno(s_alumnoId in matricula.alumnoId%type)
-- return types.ref_cursor
-- as
-- cursor_matricula types.ref_cursor;
-- begin
-- open cursor_matricula for
-- select curso.id cursoId, curso.codigo cursoCodigo, curso.nombre cursoNombre, curso.creditos cursoCreditos, curso.horasSemanales cursoHorasSemanales, 
-- carrera.id carreraId, carrera.codigo carreraCodigo, carrera.nombre carreraNombre, carrera.titulo carreraTitulo, ciclo.annio cicloAnnio, 
-- ciclo.id cicloId, ciclo.numero cicloNumero, ciclo.fechaInicio cicloFechaInicio, ciclo.fechaFinal cicloFechaFinal, ciclo.activo cicloActivo
-- from (
	-- (Matricula inner join Grupo on matricula.grupoId = grupo.id) 
	-- inner join Curso on grupo.cursoId = curso.id
	-- inner join Carrera on curso.carreraId = carrera.id
	-- inner join Ciclo on curso.cicloId = ciclo.id
	-- )
-- where matricula.alumnoId = s_alumnoId;
-- return cursor_matricula;
-- END;
-- /
-- show error

-- CICLOS --

-- INSERT
create or replace procedure insertar_ciclo(i_annio in ciclo.annio%type, i_numero in ciclo.numero%type, i_fechaInicio in ciclo.fechaInicio%type, i_fechaFinal in ciclo.fechaFinal%type, i_activo in ciclo.activo%type)
as 
begin 
insert into Ciclo values(ciclo_sequence.nextval, i_annio, i_numero, i_fechaInicio, i_fechaFinal, i_activo);
END;
/
show error

-- LIST
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

-- MODIFY
create or replace procedure modificar_ciclo(n_id in ciclo.annio%type, n_annio in ciclo.annio%type, n_numero in ciclo.numero%type, n_fechaInicio in ciclo.fechaInicio%type, n_fechaFinal in ciclo.fechaFinal%type, n_activo in ciclo.activo%type)
as
begin
update ciclo set annio = n_annio, numero=n_numero,fechaInicio=n_fechaInicio,fechaFinal=n_fechaFinal,activo=n_activo where id = n_id;
END;
/
show error

-- DELETE
create or replace procedure eliminar_ciclo(n_id in ciclo.id%type)
as
begin
delete from ciclo where id=n_id;
END;
/
show error

-- SEARCH
create or replace function buscar_ciclo(s_id in ciclo.id%type)
return types.ref_cursor
as
cursor_ciclo types.ref_cursor;
begin
open cursor_ciclo for
select *
from Ciclo;
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

-- MODIFY
create or replace procedure modificar_grupo(n_id in grupo.id%type, n_numeroGrupo in grupo.numeroGrupo%type, n_cicloId in grupo.cicloId%type, n_cursoId in grupo.cursoId%type, n_profesorId in grupo.profesorId%type, n_horario in grupo.horario%type)
as
begin
update grupo set numeroGrupo=n_numeroGrupo, cicloId=n_cicloId, cursoId=n_cursoId, profesorId=n_profesorId, horario=n_horario where id = n_id;
END;
/
show error

-- LIST (X PROFESOR ID)
create or replace function listar_grupo_profesor(p_id in grupo.profesorId%type)
return types.ref_cursor
as
grupo_cursor types.ref_cursor;
begin
open grupo_cursor for
select grupo.id, grupo.numeroGrupo, grupo.cicloId, grupo.cursoId, grupo.profesorId, grupo.horario, ciclo.annio cicloAnnio, ciclo.numero cicloNumero, ciclo.activo cicloActivo, curso.codigo cursoCodigo, curso.nombre cursoNombre, profesor.id profesorId, profesor.nombre profesorNombre
from(((Grupo
inner join Ciclo on grupo.cicloId = ciclo.id)
inner join Curso on grupo.cursoId = curso.id)
inner join Profesor on grupo.profesorId = profesor.id)
where grupo.profesorId = p_id and ciclo.activo = 1;
return grupo_cursor;
END;
/
show error

-- LIST (X CURSO)
create or replace function listar_grupo_curso(c_id in grupo.cursoId%type, ciclo_id in grupo.cicloId%type)
return types.ref_cursor
as
grupo_cursor types.ref_cursor;
begin
open grupo_cursor for
select grupo.id, grupo.numeroGrupo, grupo.cicloId, grupo.cursoId, grupo.profesorId, grupo.horario, ciclo.annio cicloAnnio, ciclo.numero cicloNumero, ciclo.activo cicloActivo, curso.codigo cursoCodigo, curso.nombre cursoNombre, profesor.id profesorId, profesor.nombre profesorNombre
from(((Grupo
inner join Ciclo on grupo.cicloId = ciclo.id)
inner join Curso on grupo.cursoId = curso.id)
inner join Profesor on grupo.profesorId = profesor.id)
where grupo.cursoId = c_id and grupo.cicloId = ciclo_id;
return grupo_cursor;
END;
/
show error

-- SEARCH
create or replace function buscar_grupo_profesor(s_id in grupo.id%type, s_profesor in grupo.profesorId%type)
return types.ref_cursor
as
grupo_cursor types.ref_cursor;
begin
open grupo_cursor for
select *
from Grupo
where grupo.id = s_id and grupo.profesorId=s_profesor;
return grupo_cursor;
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

-- DELETE
create or replace procedure eliminar_grupo(n_id in grupo.id%type)
as
begin
delete from grupo where id=n_id;
END;
/
show error

-- USUARIO --
-- INSERT
create or replace procedure insertar_usuario(i_cedula in usuario.cedula%type, i_clave in usuario.clave%type, i_rol in usuario.rol%type)
as
begin
insert into usuario values(usuario_sequence.nextval, i_cedula, i_clave, i_rol);
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

-- LIST
create or replace function listar_usuarios_admnins
return types.ref_cursor
as
cursor_usuario types.ref_cursor;
begin
open cursor_usuario for 
select usuario.id, usuario.cedula, usuario.clave, usuario.rol, rol.rol rolRol
from (usuario 
inner join Rol on usuario.rol = rol.id)
where (rol.rol = 'Admin' or rol.rol = 'Matriculador') and usuario.cedula != '1111';
return cursor_usuario;
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

-- MODIFY
create or replace procedure modificar_usuario(n_id in usuario.id%type, n_cedula in usuario.cedula%type, n_clave in usuario.clave%type, n_rol in usuario.rol%type)
as
begin
update usuario set cedula = n_cedula, clave=n_clave,rol=n_rol where id = n_id;
END;
/
show error

-- DELETE
create or replace procedure eliminar_usuario(n_id in usuario.id%type)
as
begin
delete from usuario where id=n_id;
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
-- create or replace function listar_cursos_estudiantes(s_alumnoId in matricula.alumnoId%type)
-- return types.ref_cursor
-- as
-- cursor_matricula types.ref_cursor;
-- begin
-- open cursor_matricula for
-- select curso.id, curso.codigo, curso.carreraId, curso.cicloId, curso.nombre, curso.creditos, curso.horasSemanales
-- from ((Matricula
-- inner join Grupo on matricula.grupoId = grupo.id)
-- inner join Curso on grupo.cicloId = curso.id)
-- where matricula.alumnoId = s_alumnoId;
-- return cursor_matricula;
-- END;
-- /
-- show error

create or replace function listar_matriculas_grupo(s_grupo in matricula.grupoId%type)
return types.ref_cursor
as
cursor_matricula types.ref_cursor;
begin
open cursor_matricula for
select matricula.id, matricula.numero, matricula.alumnoId, matricula.grupoId, matricula.nota,  grupo.profesorId grupoProfesorId, alumno.cedula alumnoCedula, alumno.nombre alumnoNombre, alumno.email alumnoEmail, alumno.telefono alumnoTelefono
from((Matricula
inner join Alumno on matricula.alumnoId = alumno.id)
inner join Grupo on matricula.grupoId = grupo.id)
where matricula.grupoId = s_grupo;
return cursor_matricula;
END;
/
show error

-- MODIFY
create or replace procedure modificar_matricula(n_id in matricula.id%type, n_nota in matricula.nota%type)
as
begin
update matricula set nota = n_nota where id = n_id;
END;
/
show error




-- LOGIN

create or replace function usuario_login(usuario_cedula in usuario.cedula%type, usuario_clave usuario.clave%type)
return types.ref_cursor
as
cursor_usuario types.ref_cursor;
begin
open cursor_usuario for
select id, cedula, clave, rol
from  usuario 
where usuario.cedula = usuario_cedula and usuario.clave = usuario_clave;
return cursor_usuario;
END;
/
show error


-- ROL

create or replace procedure insertar_rol(usuario_rol in usuario.rol%type)
as
begin
insert into Rol values(rol_sequence.nextval,usuario_rol);
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

exec insertar_curso('123','Fundamentos de Informatica', 4, 8);
exec insertar_curso('456','Quimica Organica I', 4, 8);
exec insertar_curso('678','Quimica Inorganica I', 4, 8); 
-- 3
exec insertar_curso('910','Elocucion', 4, 8);
exec insertar_curso('111','Geometria Analitica', 4, 8);
exec insertar_curso('222','Gramatica Basica', 3, 6);
-- 6
exec insertar_curso('333','Programacion III', 4, 8);
exec insertar_curso('444','Geometria Euclidea II', 3, 6);
exec insertar_curso('555','Educacion General', 3, 6);
-- 9
exec insertar_curso('666', 'Geometria Euclidea I', 4, 8);
exec insertar_curso('777', 'Estructuras Discretas', 4, 8);
exec insertar_curso('888','Paradigmas de Programacion', 4, 8);
exec insertar_curso('999','Bioquimica', 4, 8);
exec insertar_curso('122','Composicion', 4, 8);
exec insertar_curso('133','Algebra Lineal', 4, 8);
-- 15

exec insertar_planDeEstudio('1','1');
exec insertar_planDeEstudio('2','2');
exec insertar_planDeEstudio('3','4');
exec insertar_planDeEstudio('4','5');


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
exec insertar_grupo('1', '3', '7', '3',  '7:00 - 8:00p.m');
exec insertar_grupo('5', '3', '8', '3',  '5:00 - 6:00p.m');
exec insertar_grupo('6', '2', '9', '4',  '5:00 - 6:00p.m');
exec insertar_grupo('9', '1', '1', '4',  '5:00 - 6:00p.m');

exec insertar_ofertaAcademica('4','1');
exec insertar_ofertaAcademica('2','2');
exec insertar_ofertaAcademica('1','3');
exec insertar_ofertaAcademica('1','4');
exec insertar_ofertaAcademica('4','5');
exec insertar_ofertaAcademica('4','6');
exec insertar_ofertaAcademica('1','7');

exec insertar_rol('Admin');
exec insertar_rol('Matriculador');
exec insertar_rol('Profesor');
exec insertar_rol('Alumno');

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
exec insertar_usuario('3333', '1234', '1');

exec insertar_matricula('M1','1','1',0);
exec insertar_matricula('M1','1','3',0);
exec insertar_matricula('M1','1','4',0);
exec insertar_matricula('M1','1','5',0);



commit;










--inner join Ciclo on curso.cicloId = ciclo.id);



-- LIST
create or replace function historial_academico(s_alumnoId in matricula.alumnoId%type)
return types.ref_cursor
as
cursor_matricula types.ref_cursor;
begin
open cursor_matricula for
select matricula.id matriculaId, matricula.numero matriculaNumero, matricula.nota matriculaNota, 
grupo.id grupoId, grupo.numeroGrupo, grupo.horario grupoHorario,   
ciclo.id cicloId, ciclo.annio cicloAnnio, ciclo.numero cicloNumero, ciclo.fechaInicio cicloFechaInicio, ciclo.fechaFinal cicloFechaFinal, ciclo.activo cicloActivo,
curso.id cursoId, curso.codigo cursoCodigo, curso.nombre cursoNombre, curso.creditos cursoCreditos, curso.horasSemanales cursoHorasSemanales
from (((Matricula
inner join Grupo on matricula.grupoId = grupo.id)
inner join Ciclo on grupo.cicloID = ciclo.id)
inner join Curso on grupo.cicloId = curso.id)
where matricula.alumnoId = s_alumnoId;
return cursor_matricula;
END;
/
show error


create or replace function cursos_alumno_por_ciclo_activo(s_alumnoId in matricula.alumnoId%type)
return types.ref_cursor
as
cursor_matricula types.ref_cursor;
begin
open cursor_matricula for
select curso.id cursoId, curso.codigo cursoCodigo, curso.nombre cursoNombre, curso.creditos cursoCreditos, curso.horasSemanales cursoHorasSemanales
from (((Matricula
inner join Grupo on matricula.grupoId = grupo.id)
inner join Ciclo on grupo.cicloID = ciclo.id and ciclo.activo = 1)
inner join Curso on grupo.cicloId = curso.id)
where matricula.alumnoId = s_alumnoId;
return cursor_matricula;
END;
/
show error


create or replace function buscar_ciclo_activo
return types.ref_cursor
as
cursor_ciclo types.ref_cursor;
begin
open cursor_ciclo for
select *
from Ciclo 
where ciclo.activo = 1;
return cursor_ciclo;
END;
/
show error