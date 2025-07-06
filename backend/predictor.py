from PIL import Image, ImageOps
import numpy as np
import joblib

IMG_SIZE = 64

model = joblib.load('../model.pkl')
pca = joblib.load('../pca.pkl')
scaler = joblib.load('../scaler.pkl')

img = Image.open("input.png").convert('L').resize((IMG_SIZE, IMG_SIZE))
img = ImageOps.invert(img)
# img = img.point(lambda x: 0 if x > 200 else 255)
arr = np.array(img).reshape(1, -1)
img.save("latest_drawing.png")
arr_scaled = scaler.transform(arr)
arr_pca = pca.transform(arr_scaled)

pred = model.predict(arr_pca)[0]
proba = model.predict_proba(arr_pca)[0]
confidence = round(np.max(proba) * 100, 2)

print(f"{pred},{confidence}")
