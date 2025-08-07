# Run this once to convert your model to TensorFlow Lite
import tensorflow as tf

def convert_to_tflite():
    # Load your trained model
    model = tf.keras.models.load_model("final_cnn_model.keras")
    
    # Convert to TensorFlow Lite
    converter = tf.lite.TFLiteConverter.from_keras_model(model)
    
    # Optional optimizations
    converter.optimizations = [tf.lite.Optimize.DEFAULT]
    
    # Convert the model
    tflite_model = converter.convert()
    
    # Save the model
    with open('model.tflite', 'wb') as f:
        f.write(tflite_model)
     
    print("Model converted to TensorFlow Lite successfully!")
    print("File size comparison:")
    import os
    keras_size = os.path.getsize("final_cnn_model.keras") / (1024*1024)
    tflite_size = os.path.getsize("model.tflite") / (1024*1024)
    print(f"Keras model: {keras_size:.2f} MB")
    print(f"TFLite model: {tflite_size:.2f} MB")

if __name__ == "__main__":
    convert_to_tflite()