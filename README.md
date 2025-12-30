# **ZERO DAY ATTACK DETECTION**

## **Project Overview**

This project implements a Zero-Day Attack Detection system using unsupervised machine learning techniques. The goal of the system is to learn normal network traffic behaviour and identify deviations that may indicate unknown or previously unseen (zero-day) attacks. The implementation is carried out in Google Colab using Python.

## **Objectives**

- To study zero-day attack detection using unsupervised learning
- To model normal network behaviour without relying on attack signatures
- To reduce high-dimensional network data using PCA
- To cluster traffic patterns using K-Means
- To evaluate performance using clustering metrics and confusion matrix

## **Methodology**

### **1. Data Loading**

The dataset is loaded into Google Colab either through direct upload or by mounting Google Drive. Only relevant features required for analysis are selected.

### **2. Data Preprocessing**

Preprocessing steps such as handling missing values and feature scaling are performed. Feature scaling is important because clustering algorithms depend on distance-based calculations.

### **3. Dimensionality Reduction**

Principal Component Analysis (PCA) is applied to reduce the dimensionality of the dataset while preserving most of the data variance. This helps in improving clustering performance.

### **4. Clustering**

K-Means clustering is applied on the PCA-transformed data to group similar network traffic patterns. This process is completely unsupervised and does not use class labels during training.

### **5. Evaluation**

Ground-truth labels are used only for evaluation purposes. The clustering output is compared with actual labels to analyse how effectively the model separates normal and attack traffic.

## **Evaluation Metrics**

The following metrics are used for evaluation:

- Silhouette Score  
- Davies–Bouldin Index  
- Calinski–Harabasz Index  
- Confusion Matrix  
- Precision, Recall, and F1-Score  

Accuracy is also calculated but is not considered a reliable metric due to the imbalanced nature of the dataset.

## **Results Summary**

The clustering metrics indicate that the model forms well-separated clusters in the PCA feature space. The system is able to identify normal traffic with high confidence and maintains a low false positive rate. Attack detection is conservative, which is expected in an unsupervised zero-day detection approach.

## **Tools Used**

- Python  
- Google Colab  
- NumPy  
- Pandas  
- Scikit-learn  
- Matplotlib  

## **How to Run**

1. Open the notebook in Google Colab  
2. Upload the dataset or mount Google Drive  
3. Run the cells sequentially from top to bottom  
4. Observe the outputs and evaluation results  

## **Limitations**

The model may fail to detect attacks that closely resemble normal traffic patterns. The performance also depends on feature selection and clustering parameters. This notebook is intended mainly for academic and experimental purposes.

## **Conclusion**

This project demonstrates how unsupervised learning techniques can be applied for zero-day attack detection by modelling normal network behaviour instead of relying on known attack signatures.
