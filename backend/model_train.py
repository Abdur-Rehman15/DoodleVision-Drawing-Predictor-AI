import numpy as np
from PIL import Image
from sklearn.svm import SVC
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.model_selection import GridSearchCV
import joblib

IMG_SIZE = 64
categories = ['butterfly', 'ladder', 'apple', 'bucket', 'crown']
X, y = [], []

# Load and resize images
for category in categories:
    data = np.load(f'./data/{category}.npy')[:800]
    resized = [np.array(Image.fromarray(img).resize((IMG_SIZE, IMG_SIZE))) for img in data]
    X.extend([img.flatten() for img in resized])
    y.extend([category] * len(resized))

X = np.array(X)
y = np.array(y)

# Preprocess
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

pca = PCA(n_components=100)
X_reduced = pca.fit_transform(X_scaled)

# ✅ Use SVM with GridSearchCV
params = {
    'C': [1, 10],
    'kernel': ['linear', 'rbf'],
    'gamma': ['scale', 'auto']
}

grid = GridSearchCV(SVC(probability=True), params, cv=3)
grid.fit(X_reduced, y)

print("✅ Best SVM Params:", grid.best_params_)

# Save best model and preprocessing
joblib.dump(grid.best_estimator_, 'model.pkl')
joblib.dump(pca, 'pca.pkl')
joblib.dump(scaler, 'scaler.pkl')
