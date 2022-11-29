INSERT INTO public.editorial(edi_name)
VALUES
('Debolsillo'),
('Sudamericana'),
('Garbo'),
('Aquilina'),
('Planeta'),
('AZ'),
('Losada'),
('Panamericana'),
('Atlántida'),
('TAURUS'),
('Gaia Ediciones');

INSERT INTO public.gender(gen_name)
VALUES
('Literatura judía'),
('thriller'),
('autoayuda'),
('leyenda'),
('novela de aventuras'),
('novela de terror'),
('novela policial'),
('novela romantica'),
('ficción'),
('narrativo'),
('filosofia'),
('autoayuda');

INSERT INTO public.author("aut_name", "aut_surname")
VALUES
('Annelies Marie','Frank'),
('Stephen','King'),
('aldous','huxley'),
('audrey','niffenegger'),
('doris','lessing'),
('douglas','adams'),
('José Luis','Borges'),
('gabriel','garcia marquez'),
('herbert ','george'),
('wilkie collins','collins'),
('james',' joyce'),
('jane','austen'),
('julio','verne'),
('William','Shakespeare'),
('Paulo','Cohelo'),
('BYUNG','CHUL HAN'),
('WOLYNN','MARK');

INSERT INTO public.associated("ass_userName", "ass_password")
VALUES
('Lourdes','vamosArgentina'),
('Leo','Leo'),
('Barby','Barby'),
('Vicky','Vicky'),
('Rhonal','Rhonal');

INSERT INTO public.book("boo_ISBN","boo_borrowingSt","boo_title","aut_id","edi_id","gen_id","boo_yearEdition","boo_imagePath","ass_id")
VALUES
(1021,'false','El diario de Ana Frank',1,1,1,1947,'path22',2),
(1022,'false','El juego de Gerald',2,2,2,2015,'path23',5),
(1020,'true','Viaje al centro de la Tierra',3,3,12,1980,'path21',2),
(1010,'true','la guia del autoestopista galactico',3,5,12,2001,'path11',3),
(1019,'false','un mundo feliz',5,4,10,2001,'path20',2),
(1005,'true','el viejo y el mar',8,7,7,2002,'path6',5),
(1016,'false','matadero cinco',15,1,10,2003,'path17',2),
(1001,'true','crimen y castigo',6,3,10,2016,'path2',3),
(1003,'false','El cuaderno dorado',3,1,6,2017,'path4',1),
(1009,'true','La Guerra de los mundos',8,9,9,2006,'path10',4),
(1012,'true','La mujer del viajero en el tiempo',2,3,7,2008,'path13',3),
(1000,'false','Cien años de soledad',7,2,7,2008,'path1',1),
(1015,'false','Los Pilares de la Tierra',15,4,11,2008,'path16',2),
(1013,'false','Lolita',10,5,4,2009,'path14',5),
(1014,'true','Los hermanos Karamazov',6,2,5,2010,'path15',4),
(1018,'false','Ulises',11,2,9,2018,'path19',3),
(1011,'false','La letra escarlata',4,8,7,2014,'path12',2),
(1004,'false','El señor de los anillos',9,4,1,2016,'path5',1),
(1002,'false','Doña Berta',2,3,9,2016,'path3',4),
(1006,'false','Fahrenheit 451',5,8,5,2019,'path7',3),
(1017,'false','Orgullo y prejuicio',13,9,6,1978,'path18',5),
(1007,'false','La carretera de Cormac',3,6,10,2019,'path8',4),
(1008,'false','La dama de blanco',12,5,8,1983,'path9',1),
(1023,'false','este dolor no es mio',17,11,3,2018,'path24',4),
(1024,'false','infocracia',11,10,11,2022,'path25',5);



INSERT INTO public.borrowing("boo_id", "bor_from_date", "bor_to_date", "bor_devolution_date", "ass_id")
VALUES
(1,'11/01/2022','11/06/2022','11/05/2022',5),
(2,'11/06/2022','11/11/2022','11/11/2022',1),
(5,'11/12/2022','11/17/2022','11/18/2022',4),
(6,'11/15/2022','11/20/2022',4),
(8,'11/20/2022','11/25/2022',5),
(11,'11/21/2022','11/26/2022',1),
(15,'11/22/2022','11/27/2022',3),
(4,'11/23/2022','11/28/2022',2),
(3,'11/23/2022','11/28/2022',2),
(10,'11/24/2022','11/29/2022',2);



