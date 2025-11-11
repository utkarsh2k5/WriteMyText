# backend/main.py
from fastapi import FastAPI, Form, HTTPException
from fastapi.responses import FileResponse
from fastapi.middleware.cors import CORSMiddleware
from PIL import Image, ImageDraw, ImageFont, ImageFilter
import textwrap, uuid, os, random

app = FastAPI()

# CORS - restrict to your frontend origin in prod
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

BASE_DIR = os.path.dirname(__file__)
GENERATED_DIR = os.path.join(BASE_DIR, "generated")
FONTS_DIR = os.path.join(BASE_DIR, "fonts")
os.makedirs(GENERATED_DIR, exist_ok=True)

FONT_PATH = os.path.join(FONTS_DIR, "QEBradenHill.ttf")  # place your font here

def create_handwritten_image(text: str, width=900, height=1200, font_size=36):
    # Simple paper-like background
    background = Image.new("RGB", (width, height), "white")
    draw = ImageDraw.Draw(background)

    # Optional: add subtle paper texture by drawing faint noise lines
    for i in range(40, height, 120):
        draw.line([(40, i + random.randint(-3,3)), (width-40, i + random.randint(-3,3))], fill=(245,245,245), width=1)

    # load font
    try:
        font = ImageFont.truetype(FONT_PATH, font_size)
    except IOError:
        raise RuntimeError("Font not found on server. Put your .ttf in backend/fonts/ and restart.")

    margin = 60
    offset = 80
    max_chars = 40
    # wrap and draw lines with slight horizontal jitter / uneven spacing
    for line in textwrap.wrap(text, width=max_chars):
        jitter_x = random.randint(-4, 4)
        jitter_y = random.randint(-2, 6)
        draw.text((margin + jitter_x, offset + jitter_y), line, font=font, fill="black")
        offset += font_size + random.randint(6, 14)

    # small gaussian blur to mimic ink spread
    background = background.filter(ImageFilter.GaussianBlur(0.3))
    return background

@app.post("/generate-note/")
async def generate_note(text: str = Form(...)):
    if not text or text.strip() == "":
        raise HTTPException(status_code=400, detail="Text is required.")
    img = create_handwritten_image(text, font_size=34)
    filename = f"{uuid.uuid4().hex}.jpg"
    filepath = os.path.join(GENERATED_DIR, filename)
    img.save(filepath, format="JPEG", quality=90)
    return FileResponse(filepath, media_type="image/jpeg", filename=filename)
