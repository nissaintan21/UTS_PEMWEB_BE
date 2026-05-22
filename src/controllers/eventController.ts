import { Request, Response } from 'express';
import { Event } from "../types/event";
import { prisma } from '../lib/db.js';

let events: Event[] = [];

//1. menampilkan semua event 
export const getAllEvents = async (req: Request, res: Response) => {
    try{
        //ambil data event dari database 
        const allEvents = await prisma.event.findMany({
            orderBy: {
                createdAt: "desc"
            }
        });
        //tampilkan semua data
        res.json(allEvents);
    } catch (error) {
        // jika terjadi error, kirim response error
        res.status(500).json({ message: "Terjadi kesalahan saat mengambil data event", error });
    }
};

//2. menyimpan data event baru 
export const createEvent = async (req: Request, res: Response) => {
    try{
        const {name,categoryId,pembicaraId,location,dateEvent,description} = req.body;

        // validasi jika ada data yang belum diisi 
        if (!name || !categoryId || !pembicaraId || !location || !dateEvent || !description) {
            return res.status(500).json({ message: "Semua field harus diisi" });
        }

        // jika data sudah valid, buat event baru
        const newEvent: Event = await prisma.event.create({
            data: {
                name,
                categoryId,
                pembicaraId,
                location,
                dateEvent: new Date(dateEvent),
                description
            }
        });

        res.status(201).json(newEvent);
    } catch (error) {
        // jika terjadi error, kirim response error
        res
            .status(500)
            .json({ message: "Terjadi kesalahan saat membuat event", error });
    }
};

//3. menampilkan data event berdasarkan id
//3. menampilkan data event berdasarkan id
export const getEventById = async (
  req: Request,
  res: Response
) => {

  try {

    const id = Number(req.params.id);

    const event = await prisma.event.findUnique({
      where: {
        id,
      },
    });

    if (!event) {

      return res.status(404).json({
        message: "Event tidak ditemukan",
      });
    }

    res.json(event);

  } catch (error) {

    res.status(500).json({
      message:
        "Terjadi kesalahan saat mengambil data event",
      error,
    });
  }
};

//4. menupdate data event berdasarkan id
//4. mengupdate data event berdasarkan id
export const updateEventById = async (
  req: Request,
  res: Response
) => {

  try {

    const id = Number(req.params.id);

    const {
      name,
      categoryId,
      pembicaraId,
      location,
      dateEvent,
      description
    } = req.body;

    const updatedEvent =
      await prisma.event.update({
        where: {
          id,
        },

        data: {
          name,
          categoryId,
          pembicaraId,
          location,
          dateEvent: new Date(dateEvent),
          description,
        },
      });

    res.json(updatedEvent);

  } catch (error) {

    res.status(500).json({
      message:
        "Terjadi kesalahan saat update event",
      error,
    });
  }
};
//5. menghapus data event berdasarkan id
export const deleteEventById = async (
  req: Request,
  res: Response
) => {

  try {

    const id = Number(req.params.id);

    await prisma.event.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Event berhasil dihapus",
    });

  } catch (error) {

    res.status(500).json({
      message: "Terjadi kesalahan saat menghapus event",
      error,
    });
  }
};