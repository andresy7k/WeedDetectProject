# WeedDetectProject 🌱🤖

Computer Vision system developed in Python to automate weed detection in agricultural crops using Convolutional Neural Networks (CNN) and Transfer Learning. 

This project aims to solve a real-world agricultural problem by accurately identifying different weed species, facilitating targeted herbicide application and improving crop yield.

## 📊 Performance & Results
The model achieves an **accuracy rate of 90% to 95%** across 9 different classes of weed images, proving its robustness in real-world agricultural image scenarios.

## 🛠️ Technologies & Stack
* **Language:** Python
* **Machine Learning Framework:** TensorFlow / Keras
* **Transfer Learning:** MobileNetV2 (Pre-trained)
* **Data Processing:** Pandas, NumPy, scikit-learn
* **Pipeline:** `tf.data` API (for efficient data loading, augmentation, and stratified splitting)
* **Computer Vision:** Mathematical morphology analysis

## 📂 Dataset
This project utilizes the **DeepWeeds** dataset, which consists of images of 9 different weed classifications commonly found in agricultural environments. The data pipeline includes image augmentation techniques to improve model generalization and prevent overfitting.

## 🚀 Features
1. **Custom CNN Training:** Initial training of a custom neural network architecture.
2. **Transfer Learning Optimization:** Integration of `MobileNetV2` to extract high-level visual features, significantly reducing training time and boosting accuracy (up to 95%).
3. **Data Pipeline Optimization:** Implementation of `tf.data` for seamless batch processing and memory management.
4. **Inference Functionality:** Includes a prediction script to evaluate and classify new, unseen images of crops.

## ⚙️ Setup and Installation

1. Clone this repository:
   ```bash
   git clone [https://github.com/andresy7k/WeedDetectProject.git](https://github.com/andresy7k/WeedDetectProject.git)
   cd WeedDetectProject
