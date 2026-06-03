import detail_pinjam from "../models/detail_pinjam.model.js"; // Pastikan path benar
import { Sequelize } from "sequelize";
import Buku from "../models/buku.model.js";
import tabel_pinjam from "../models/pinjam.model.js";
import Mahasiswa from "../models/mahasiswa.model.js";


export const cariBukuDipinjamMahasiswa = async (req, res) => {
    try { 

        const datapinjaman = await detail_pinjam.findAll({
            where: {
                status: 1 // status dipinjam
            },
            include: [
                {
                    model: tabel_pinjam,
                    where: {
                        nim: req.params.nim
                    },
                    include: [
                        {model: Mahasiswa, attributes: ['nama']
                        }
                    ]
                },
                {
                    model: Buku,
                    attributes: ['judul']
                }
            ]
        });
        const hasil = datapinjaman.map(item => ({
            id: item.id,
            nama_mahasiswa: item.tabel_pinjam.Mahasiswa.nama,
            judul_buku: item.Buku.judul,
            jumlah_pinjam: item.jml_pinjam
        }));

        res.json(hasil);

    } catch (error) {
        res.json({
            message: error.message
        });
    }
};

export const prosesPengembalian = async (req, res) => {
    try {
        const dataKembali = req.body.data;
        for (const item of dataKembali) {
            const detail = await detail_pinjam.findOne({
                where: {
                    id: item.id,
                    status: 1
                }
            });
            if (!detail) {
                return res.json({
                    message: `Data detail pinjam ${item.id} tidak ditemukan`
                });
            }
            // VALIDASI
            if (item.jml_kembali > detail.jml_pinjam) {
                return res.json({
                    message: `Jumlah kembali melebihi jumlah pinjam`
                });
            }
            // ==========================
            // KEMBALI SEMUA
            // ==========================
            if (item.jml_kembali == detail.jml_pinjam) {
                await detail_pinjam.update({
                    status: 2,
                    tanggal_kembali: new Date()
                }, {
                    where: {
                        id: detail.id
                    }
                });
            } else {
                // ==========================
                // KEMBALI SEBAGIAN
                // ==========================
                // update sisa pinjaman lama
                await detail_pinjam.update({
                    jml_pinjam: detail.jml_pinjam - item.jml_kembali
                }, {
                    where: {
                        id: detail.id
                    }
                });
                // insert riwayat pengembalian
                await detail_pinjam.create({
                    pinjam_id: detail.pinjam_id,
                    buku_id: detail.buku_id,
                    jml_pinjam: item.jml_kembali,
                    status: 2,
                    tanggal_kembali: new Date()
                });
            }
            // ==========================
            // TAMBAH STOK BUKU
            // ==========================
            await Buku.increment('jumlah', {
                by: item.jml_kembali,
                where: {
                    buku_id: detail.buku_id
                }
            });
        }
        res.json({
            message: "Pengembalian berhasil diproses"
        }); 
    } catch (error) {
        res.json({
            message: error.message
        });
    }
};
export const laporanPengembalian = async (req, res) => {
    try {
        const data = await detail_pinjam.findAll({
            include: [
                {
                    model: Buku,
                    attributes: ['judul']
                },
                {
                    model: tabel_pinjam,
                    include: [
                        {
                            model: Mahasiswa,
                            attributes: ['nama']
                        }
                    ]
                }
            ]
        });
        const hasil = data.map(item => {
            const tanggalPinjam = new Date(item.tabel_pinjam.tanggal_pinjam);
            const tanggalKembali = new Date(item.tabel_pinjam.tanggal_kembali);
            const status = item.status === 1 ? "Dipinjam" : "Dikembalikan";
            const selisih =
                Math.floor(
                    (tanggalKembali - tanggalPinjam)
                    / (1000 * 60 * 60 * 24)
                );
            const terlambat = selisih > 7 ? selisih - 7 : 0;
            return {
                nama_mahasiswa: item.tabel_pinjam.Mahasiswa.nama,
                nama_buku: item.Buku.judul,
                jumlah_pinjam: `${item.jml_pinjam} buku`,
                tanggal_pengembalian: item.tanggal_kembali,
                hari_terlambat: `${terlambat} hari`,
                status: status
            };
        });
        res.json(hasil);
    } catch (error) { 
        res.json({
            message: error.message
        });
    }
};

 export const insertPinjam = async (req, res) => {
 try {
 const pinjam = await Pinjam.create(
 {
 tanggal_pinjam: req.body.tanggal_pinjam,
 tanggal_kembali: req.body.tanggal_kembali,
 nim: req.body.nim,
 pegawai_id: req.body.pegawai_id,
 detail_pinjams: req.body.detail_pinjams
 },
 {
 include: detail_pinjam
 }

 );
 res.json(pinjam);
 } catch (error) {
 res.json({ message: error.message });
 }
 };


 
// Mengambil semua data detail pinjam beserta data buku
export const getAlldetail = async (req, res) => {
    try {
        const detail_pinjams = await detail_pinjam.findAll({
            include: { model: Buku },
        });
        res.json(detail_pinjams);
    } catch (error) {
        res.json({ message: error.message });
    }
};


// Mencari detail pinjam berdasarkan ID (Primary Key)
export const cariDetailByID = async (req, res) => {
    try {
        const datadetail = await detail_pinjam.findAll({
            where: {
                id_detail: req.params.detail_id,
            },
            include: { model: Buku },
        });
        res.json(datadetail[0]);
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Update data detail pinjam
export const updateDetail = async (req, res) => {
    try {
        await detail_pinjam.update(req.body, {
            where: {
                id_detail: req.params.detail_id 
            }
        });
        res.json({ message: "Detail pinjam berhasil diupdate" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

// Menghapus data detail pinjam
export const deleteDetail = async (req, res) => {
    try {
        const result = await detail_pinjam.destroy({
            where: {
                id_detail: req.params.detail_id
            }
        });
        res.json({ message: "Detail pinjam berhasil dihapus", data: result });
    } catch (error) {
        res.json({ message: error.message });
    }
};