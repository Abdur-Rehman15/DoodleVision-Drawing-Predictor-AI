import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
import numpy as np
import tensorflow as tf
from PIL import Image, ImageOps
import sys

# Must match train.py EXACTLY
CLASSES = ["crown", "apple", "butterfly", "bucket", "ladder"]

def preprocess_image(image_path):
    
    try:
        img = Image.open(image_path).convert('L')  # Grayscale
        img = ImageOps.invert(img)  # Critical: matches training data format
        img = img.resize((28, 28))  # Model expects 28x28
        img_arr = np.array(img).reshape(1, 28, 28, 1).astype('float32') / 255.0
        return img_arr
    except Exception as e:
        print(f"Preprocessing error: {str(e)}", file=sys.stderr)
        return None

def predict():
    try:
        # Load model (same filename as saved in train.py)
        model = tf.keras.models.load_model("final_cnn_model.keras")
        
        # Preprocess and predict
        img_arr = preprocess_image("input.png")
        if img_arr is None:
            print("error,0.00", file=sys.stderr)
            sys.exit(1)
            
        preds = model.predict(img_arr, verbose=0)[0]
        pred_idx = np.argmax(preds)
        
        # Output format MUST be "label,confidence"
        print(f"{CLASSES[pred_idx]},{preds[pred_idx]*100:.2f}")
        
    except Exception as e:
        print(f"error,0.00", file=sys.stderr)
        sys.exit(1)

if __name__ == "__main__":
    predict()