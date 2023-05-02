drop database secondhand;

create database secondhand;
use secondhand;
create table LOAISANPHAM (
	IDLoai char(3) primary key,
    TenLoai varchar(20) not null
);
select * from LOAISANPHAM;
insert into loaisanpham values('L01','Áo');
insert into loaisanpham values('L02','Quần');
insert into loaisanpham values('L03','Đầm');


create table SANPHAM (
	IDLoai char(3) references IDLoai(LOAISANPHAM),
    IDSanPham char(3) primary key,
    TenSanPham varchar (50),
    DoMoi int,
    ChatLieu varchar(20),
    XuatSu varchar(20),
    Gia float not null,
    Hinh1 varchar(1500),
    Hinh2 varchar(1500)
);

alter table SANPHAM add foreign key(IDLoai) references LOAISANPHAM(IDLoai);
ALTER TABLE SANPHAM ADD  TonTai char(1);

select * from sanpham;


-- thêm sản phẩm 

insert into SanPham Values ('L01','A01','Áo sweater Monoco',98,'Thun','VietNam',100000,'img\\Áo\\A01AoSweaterMonoco100.png','img\\Áo\\A01sau_aoSwearer.png','1');										
insert into SanPham Values ('L01','A02','Áo sơ mi LaMo',98,'Cát hàn','VietNam',120000,'img\\Áo\\A02SomiLaMo120Cat.PNG','img\\Áo\\A02sauSomi.PNG','1');										
insert into SanPham Values ('L01','A03','Sơ mi trắng Hàn Quốc',98,'Voan','VietNam',120000,'img\\Áo\\somi trang HanQuoc voan 120.PNG','img\\Áo\\sau so mi HanQuoc.PNG','1');										
insert into SanPham Values ('L01','A04','Áo dạ Lili',98,'Dạ','VietNam',200000,'img\\Áo\\AoDaLili200.PNG','img\\Áo\\sauaoda.PNG','1');										
insert into SanPham Values ('L01','A05','Sơ mi đen phồng',99,'voan','VietNam',170000,'img\\Áo\\somiphong den 170 cat.PNG','img\\Áo\\sau somi phong den.PNG','1');										
insert into SanPham Values ('L01','A06','Áo polo',99,'Thun sốp','VietNam',85000,'img\\Áo\\polo_thunsop_60k.PNG','img\\Áo\\sau_polo.PNG','1');										
insert into SanPham Values ('L01','A07','Sơ mi trắng công sở',98,'Voan','VietNam',150000,'img\\Áo\\somi cong so voan 150.PNG','img\\Áo\\sau so mi cong so.PNG','1');										
insert into SanPham Values ('L01','A08','Áo dạ LaMo',99,'Cát Hàn','VietNam',160000,'img\\Áo\\SomiLaMo 160 Cat.PNG','img\\Áo\\sauLamo.PNG','1');

insert into SanPham Values ('L02','Q01','Váy Kaki ',98,'Kaki','VietNam',100000,'img\\Quần\\vayKaki 100.PNG','img\\Quần\\sau Kaki.PNG','1');										
insert into SanPham Values ('L02','Q02','Váy Kaki ',98,'sweet','VietNam',105000,'img\\Quần\\chan vay Miều 105k SML.JPG','img\\Quần\\sau_caro.JPG','1');
insert into SanPham Values ('L02','Q03','Váy dài Midi Kyubi',98,'Jean','VietNam',100000,'img\\Quần\\vay dai Midi jean kyubi  100.PNG','img\\Quần\\say kyubi.PNG','1');										
insert into SanPham Values ('L02','Q04','Quần short Demin',98,'Dạ','VietNam',100000,'img\\Quần\\short demin 100k.PNG','img\\Quần\\sau short demin.PNG','1');										
insert into SanPham Values ('L02','Q05','Quần Dottie',99,'kaki','VietNam',80000,'img\\Quần\\quan dottie 80 kaki.PNG','img\\Quần\\sau Dottie.PNG','1');										
insert into SanPham Values ('L02','Q06','Quần jean Kyubi',99,'Jean','VietNam',120000,'img\\Quần\\jean kyubi lover 120.PNG','img\\Quần\\sau kyubi lover.PNG','1');										
insert into SanPham Values ('L02','Q07','Váy xếp li Oxatyl',98,'Cát Hàn','VietNam',150000,'img\\Quần\\vay xep li Oxatyl 150.PNG','img\\Quần\\sau xep li.PNG','1');										
insert into SanPham Values ('L02','Q08','Quần jean baggy',99,'jean','VietNam',120000,'img\\Quần\\jean baggy 120.PNG','img\\Quần\\sau baggy.PNG','1');

insert into SanPham Values ('L03','D01','Đầm Bon',98,'Cát hàn','VietNam',200000,'img\\Đầm\\dam Bon 200.PNG','img\\Đầm\\sau Bon.PNG','1');										
insert into SanPham Values ('L03','D02','Đầm trắng bẹt vai tà bên',99,'voan','VietNam',200000,'img\\Đầm\\dam trang bet vai ta ben.PNG','img\\Đầm\\sau dam trang.PNG','1');
insert into SanPham Values ('L03','D03','Đầm Ritara',98,'lụa hàn','VietNam',300000,'img\\Đầm\\dam Ritara_M 650k.PNG','img\\Đầm\\mat sau Ritara.PNG','1');
insert into SanPham Values ('L03','D04','Đầm Yume',98,'sốp','VietNam',200000,'img\\Đầm\\dam Yume 200 sop.PNG','img\\Đầm\\sau yume.PNG','1');
insert into SanPham Values ('L03','D05','Set dạ hai dây ',98,'tweed','VietNam',250000,'img\\Đầm\\set da tweed 2 day 250.PNG','img\\Đầm\\sau da.PNG','1');
insert into SanPham Values ('L03','D06','Đầm ',98,'Cát hàn','VietNam',280000,'img\\Đầm\\dam Esswear S 280k.PNG','img\\Đầm\\mat sau Esswear.PNG','1');
insert into SanPham Values ('L03','D07','Đầm  Kanel',98,'Kaki','VietNam',300000,'img\\Đầm\\dam Kanel 300 sop.PNG','img\\Đầm\\sau Kanel.PNG','1');
insert into SanPham Values ('L03','D08','Đầm hoa nổi tay phồng',98,'sốp','VietNam',200000,'img\\Đầm\\dam hoa noi tay phong 200.PNG','img\\Đầm\\sau vay dam no.PNG','1');
select *from sanpham;

									

create table SIZE (
	IDSize char(3) primary key,
    Ten varchar(5)
);
INSERT INTO `secondhand`.`size` (`IDSize`, `Ten`) VALUES ('S01', 'S');
INSERT INTO `secondhand`.`size` (`IDSize`, `Ten`) VALUES ('S02', 'M');
INSERT INTO `secondhand`.`size` (`IDSize`, `Ten`) VALUES ('S03', 'L');
INSERT INTO `secondhand`.`size` (`IDSize`, `Ten`) VALUES ('S04', 'XL');

select *from SIZE;


create table SOLUONG(
	IDSanPham char(3),
    IDSize char(3),
    SoLuong int,
    primary key (IDSanPham, IDSize)
);
select * from soluong;
alter table SOLUONG add foreign key(IDSanPham) references SANPHAM(IDSanPham);
alter table SOLUONG add foreign key(IDSize) references Size(IDSize);


insert into soluong Values ('A01','S01',2);
insert into soluong Values ('A01','S03',1);
insert into soluong Values ('A02','S01',4);
insert into soluong Values ('A03','S01',2);
insert into soluong Values ('A04','S03',1);
insert into soluong Values ('A05','S01',4);
insert into soluong Values ('A06','S01',2);
insert into soluong Values ('A07','S03',1);
insert into soluong Values ('A08','S01',4);

insert into soluong Values ('Q01','S01',3);
insert into soluong Values ('Q02','S01',3);
insert into soluong Values ('Q03','S01',3);
insert into soluong Values ('Q04','S01',3);
insert into soluong Values ('Q05','S01',3);
insert into soluong Values ('Q06','S01',3);
insert into soluong Values ('Q07','S01',3);
insert into soluong Values ('Q08','S01',3);

insert into soluong Values ('D01','S01',2);
insert into soluong Values ('D01','S02',3);
insert into soluong Values ('D02','S01',2);
insert into soluong Values ('D03','S02',3);
insert into soluong Values ('D04','S01',2);
insert into soluong Values ('D04','S02',3);
insert into soluong Values ('D05','S01',2);
insert into soluong Values ('D06','S02',3);
insert into soluong Values ('D07','S01',2);
insert into soluong Values ('D07','S02',3);
insert into soluong Values ('D08','S01',2);
insert into soluong Values ('D08','S02',3);
select * from soluong;


create table TAIKHOAN (
	IDTaiKhoan int auto_increment primary key,
    HoTen varchar(50),
    DiaChi varchar(100),
    email varchar(100),
    SDT char(10),
    MatKhau varchar(20),
    VaiTro varchar(20)
);
ALTER TABLE TAIKHOAN ADD  HanDung char(1);
select *from TAIKHOAN;
alter table TAIKHOAN modify MatKhau varchar(50);

-- 
create table SOLUONGGH (
    IDTaiKhoan int,
	foreign key (IDTaiKhoan) references TAIKHOAN(IDTaiKhoan),
    IDSanPham char(3),
    SoLuong int,
    TenSize varchar(5),
    primary key(IDTaiKhoan,IDSanPham)
);

alter table soluonggh add foreign key(IDSanPham) references soluonggh(IDSanPham);
ALTER TABLE SOLUONGGH ADD  TenSize  varchar(5);

create table DONHANG (
	IDTaiKhoan int, 
    foreign key (IDTaiKhoan) references TAIKHOAN(IDTaiKhoan),
    IDDonHang int auto_increment primary key,
    TongTien float,
    NgayDat date,
    GioDat time,
    TrangThai varchar(20)
);


create table SOLUONGDH(
	IDDonHang int, 
    foreign key (IDDonHang) references DONHANG(IDDonHang),
    IDSanPham char(3) references IDSanPham(SANPHAM),
    SoLuong int,
    primary key(IDDonHang,IDSanPham)
);
ALTER TABLE SOLUONGDH
ADD TENSize varchar(5) ;

select *from SOLUONGDH;
alter table SOLUONGDH add foreign key(IDSanPham) references SANPHAM(IDSanPham);


-- alter table SOLUONGDH add foreign key(IDSanPham) references SANPHAM(IDSanPham) ON DELETE SET NULL;


#####THU NGHIEM
select * from donhang;
delete from donhang where IDDonHang=2;

select * from SANPHAM sp 
join SOLUONG sl on sp.IDSanPham=sl.IDSanPham
join SIZE s on s.IDSize=sl.IDSize
where sp.IDSanPham='A01';

 select  *
           from sanpham sp join soluong sl on sp.IDSanPham = sp.IDSanPham
            where sp.IDLoai='L01';
                            
insert into SanPham Values ('L07','K06','Đầm ',98,'Cát hàn','VietNam',280000,'img\\Đầm\\dam Esswear S 280k.PNG','img\\Đầm\\mat sau Esswear.PNG');
insert into SanPham Values ('L07','K07','Đầm  Kanel',98,'Kaki','VietNam',300000,'img\\Đầm\\dam Kanel 300 sop.PNG','img\\Đầm\\sau Kanel.PNG');
insert into SanPham Values ('L07','K08','Đầm hoa nổi tay phồng',98,'sốp','VietNam',200000,'img\\Đầm\\dam hoa noi tay phong 200.PNG','img\\Đầm\\sau vay dam no.PNG');

insert into soluong Values ('K06','S02',3);
insert into soluong Values ('K07','S02',3);
insert into soluong Values ('K08','S01',2);
insert into soluong Values ('K08','S02',3);

select * from soluongdh;

select count(*) from 
                            SANPHAM sp join soluong sl on sp.IDSanPham=sl.IDSanPham
                            where sl.IDSanPham='A01';
                            
select * from sanpham natural join SOLUONG 
natural join Size where IDSanPham='A01';
select max(IDDonHang) from DONHANG ;
select * from soluong;
select * from donhang;
select * from sanpham sp  join SOLUONG sl on sp.IDSanPham = sl.IDSanPham 
    where sl.IDSanPham='A02' and IDSize='S01';

select Ten from sanpham sp  join SOLUONG sl on sp.IDSanPham = sl.IDSanPham 
                                                    join size s on s.IDSize=sl.IDSize
    where sl.IDSanPham='A02' and sl.IDSize='S01';

select * from soluongdh;