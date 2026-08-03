import 'package:flutter/material.dart';

import '../core/network/api_client.dart';
import '../core/constants/api_endpoints.dart';
import '../models/project_model.dart';

class ProjectProvider extends ChangeNotifier {
  List<ProjectModel> _projects = [];
  bool _isLoading = false;
  String _selectedDept = 'All';
  String _searchQuery = '';

  List<ProjectModel> get projects => _projects;
  bool get isLoading => _isLoading;
  String get selectedDept => _selectedDept;
  String get searchQuery => _searchQuery;

  List<ProjectModel> get filteredProjects {
    return _projects.where((p) {
      final matchesDept = _selectedDept == 'All' ||
          p.department.toLowerCase() == _selectedDept.toLowerCase();
      final matchesSearch = _searchQuery.isEmpty ||
          p.title.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          p.domain.toLowerCase().contains(_searchQuery.toLowerCase()) ||
          p.techStack.any((t) => t.toLowerCase().contains(_searchQuery.toLowerCase()));
      return matchesDept && matchesSearch;
    }).toList();
  }

  ProjectProvider() {
    fetchProjects();
  }

  void setSelectedDept(String dept) {
    _selectedDept = dept;
    notifyListeners();
  }

  void setSearchQuery(String query) {
    _searchQuery = query;
    notifyListeners();
  }

  Future<void> fetchProjects() async {
    _isLoading = true;
    notifyListeners();

    try {
      final response = await ApiClient().client.get(ApiEndpoints.projects);
      if (response.statusCode == 200) {
        final List data = response.data['data'] ?? response.data['projects'] ?? [];
        _projects = data.map((item) => ProjectModel.fromJson(item)).toList();
      }
    } catch (e) {
      // Fallback fallback mock items if server empty or network unreachable
      if (_projects.isEmpty) {
        _projects = _getMockProjects();
      }
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  List<ProjectModel> _getMockProjects() {
    return [
      ProjectModel(
        id: '1',
        title: 'AI Smart Health Monitoring & Disease Prediction',
        department: 'CSE',
        category: 'IEEE 2026',
        domain: 'Artificial Intelligence',
        abstractText: 'An advanced deep learning framework utilizing CNN and Transformers for real-time patient vitals monitoring and disease prediction.',
        techStack: ['Python', 'TensorFlow', 'Flutter', 'FastAPI'],
        difficulty: 'Advanced',
      ),
      ProjectModel(
        id: '2',
        title: 'Blockchain Based Secure Academic Certificate Verification',
        department: 'IT',
        category: 'IEEE 2026',
        domain: 'Blockchain & Cyber Security',
        abstractText: 'Decentralized smart contract system ensuring counterfeit-proof academic records with instant QR verification.',
        techStack: ['Solidity', 'Ethereum', 'React', 'Node.js'],
        difficulty: 'Expert',
      ),
      ProjectModel(
        id: '3',
        title: 'Autonomous IoT Drone for Agricultural Crop Inspection',
        department: 'ECE',
        category: 'IEEE 2026',
        domain: 'IoT & Robotics',
        abstractText: 'Embedded drone system with thermal cameras and edge computing for automated crop disease detection and soil moisture mapping.',
        techStack: ['Raspberry Pi', 'OpenCV', 'Python', 'MQTT'],
        difficulty: 'Advanced',
      ),
      ProjectModel(
        id: '4',
        title: 'Deep Learning Based Automated Defect Detection in Manufacturing',
        department: 'Mechanical',
        category: 'IEEE 2026',
        domain: 'Computer Vision',
        abstractText: 'High-speed automated optical inspection (AOI) pipeline detecting micro-cracks and surface flaws in industrial components.',
        techStack: ['YOLOv8', 'PyTorch', 'OpenCV'],
        difficulty: 'Intermediate',
      ),
    ];
  }
}
