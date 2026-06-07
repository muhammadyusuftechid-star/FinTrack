# Menggunakan image Python yang ringan
FROM python:3.12-slim

# Set working directory di dalam container
WORKDIR /app

# Salin file requirements (jika ada) atau install langsung dari list
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Salin seluruh kode backend ke dalam container
COPY . .

# Ekspos port 8000
EXPOSE 8000

# Perintah untuk menjalankan server FastAPI
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
