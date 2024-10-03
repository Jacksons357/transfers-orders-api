-- CreateTable
CREATE TABLE "transfers" (
    "id" TEXT NOT NULL,
    "product" TEXT,
    "code" TEXT NOT NULL,
    "quantity" TEXT NOT NULL,
    "lote" TEXT,
    "validate" TEXT,
    "destination" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,
    "updateAt" TIMESTAMP(3) DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "transfers_pkey" PRIMARY KEY ("id")
);
