import { Request, Response } from "express";
import { prisma } from "../lib/db.js";

// GET ALL
export const getAllPembicara = async (
  req: Request,
  res: Response
) => {

  try {

    const allPembicara =
      await prisma.pembicara.findMany();

    res.json(allPembicara);

  } catch (error) {

    res.status(500).json(error);
  }
};

// CREATE
export const createPembicara = async (
  req: Request,
  res: Response
) => {

  try {

    const { name, role } = req.body;

    const newPembicara =
      await prisma.pembicara.create({
        data: {
          name,
          role,
        },
      });

    res.status(201).json(newPembicara);

  } catch (error) {

    res.status(500).json(error);
  }
};

// GET BY ID
export const getPembicaraById = async (
  req: Request,
  res: Response
) => {

  try {

    const id = Number(req.params.id);

    const pembicara =
      await prisma.pembicara.findUnique({
        where: {
          id,
        },
      });

    res.json(pembicara);

  } catch (error) {

    res.status(500).json(error);
  }
};

// UPDATE
export const updatePembicaraById = async (
  req: Request,
  res: Response
) => {

  try {

    const id = Number(req.params.id);

    const { name, role } = req.body;

    const updatedPembicara =
      await prisma.pembicara.update({
        where: {
          id,
        },

        data: {
          name,
          role,
        },
      });

    res.json(updatedPembicara);

  } catch (error) {

    res.status(500).json(error);
  }
};

// DELETE
export const deletePembicaraById = async (
  req: Request,
  res: Response
) => {

  try {

    const id = Number(req.params.id);

    await prisma.pembicara.delete({
      where: {
        id,
      },
    });

    res.json({
      message: "Pembicara berhasil dihapus",
    });

  } catch (error) {

    res.status(500).json(error);
  }
};