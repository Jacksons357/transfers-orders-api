-- CreateTable
CREATE TABLE "transfers" (
    "id" TEXT NOT NULL,
    "product" TEXT,
    "code" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "lote" TEXT,
    "validate" TEXT,
    "destination" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updadteAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transfers_pkey" PRIMARY KEY ("id")
);
