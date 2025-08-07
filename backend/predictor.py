import numpy as np
import tensorflow as tf
from PIL import Image, ImageOps
import sys
import time

# Must match train.py EXACTLY
CLASSES = ["crown", "apple", "butterfly", "bucket", "ladder"]

class TFLitePredictor:
    def __init__(self):
        # Load TFLite model and allocate tensors
        self.interpreter = tf.lite.Interpreter(model_path="model.tflite")
        self.interpreter.allocate_tensors()
        
        # Get input and output tensors
        self.input_details = self.interpreter.get_input_details()
        self.output_details = self.interpreter.get_output_details()
        
        print("TFLite model loaded successfully", file=sys.stderr)
    
    def preprocess_image(self, image_path):
        """Lightning-fast preprocessing"""
        try:
            with Image.open(image_path) as img:
                img = img.convert('L')
                img = ImageOps.invert(img)
                img = img.resize((28, 28), Image.Resampling.NEAREST)  # Faster than LANCZOS
                img_arr = np.array(img, dtype=np.float32).reshape(1, 28, 28, 1)
                img_arr /= 255.0
                return img_arr
        except Exception as e:
            print(f"Preprocessing error: {str(e)}", file=sys.stderr)
            return None
    
    def predict(self, image_path="input.png"):
        """Ultra-fast prediction using TFLite"""
        try:
            img_arr = self.preprocess_image(image_path)
            if img_arr is None:
                print("error,0.00")
                return
            
            # Set input tensor
            self.interpreter.set_tensor(self.input_details[0]['index'], img_arr)
            
            # Run inference
            self.interpreter.invoke()
            
            # Get output tensor
            preds = self.interpreter.get_tensor(self.output_details[0]['index'])[0]
            pred_idx = np.argmax(preds)
            
            print(f"{CLASSES[pred_idx]},{preds[pred_idx]*100:.2f}")
            
        except Exception as e:
            print("error,0.00")
            sys.exit(1)

# Global predictor instance
_predictor = None

def get_predictor():
    global _predictor
    if _predictor is None:
        _predictor = TFLitePredictor()
    return _predictor

def predict():
    predictor = get_predictor()
    predictor.predict()

if __name__ == "__main__":
    start_time = time.time()
    predict()
    end_time = time.time()
    print(f"Prediction time: {end_time - start_time:.3f}s", file=sys.stderr)