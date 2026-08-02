import 'package:flutter/material.dart';
import '../core/network/api_client.dart';
import '../core/constants/api_endpoints.dart';
import '../models/service_model.dart';
import '../models/quote_model.dart';

class ServiceProvider extends ChangeNotifier {
  List<ServiceModel> _services = [];
  bool _isLoading = false;

  List<ServiceModel> get services => _services;
  bool get isLoading => _isLoading;

  ServiceProvider() {
    fetchServices();
  }

  Future<void> fetchServices() async {
    _isLoading = true;
    notifyListeners();

    try {
      final response = await ApiClient().client.get(ApiEndpoints.services);
      if (response.statusCode == 200) {
        final List data = response.data['data'] ?? response.data['services'] ?? [];
        _services = data.map((item) => ServiceModel.fromJson(item)).toList();
      }
    } catch (e) {
      if (_services.isEmpty) {
        _services = _getMockServices();
      }
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  Future<bool> submitQuoteRequest(QuoteModel quote) async {
    try {
      final response = await ApiClient().client.post(
        ApiEndpoints.contact,
        data: quote.toJson(),
      );
      return response.statusCode == 200 || response.statusCode == 201;
    } catch (e) {
      return true; // Still allow local success & WhatsApp launch
    }
  }

  List<ServiceModel> _getMockServices() {
    return [
      ServiceModel(
        id: '1',
        serviceName: 'Final Year Academic Project',
        description: 'Complete end-to-end guidance including IEEE base paper implementation, full source code, dataset, database setup, and viva prep.',
        icon: 'GraduationCap',
        features: [
          'Full Source Code & Architecture',
          'Database Setup & API Backend',
          'IEEE Base Paper & IEEE 2026 Standards',
          'Viva Voce Q&A Presentation Support',
          '1-on-1 Code Walkthrough Sessions'
        ],
        priceRange: '₹3,500 - ₹8,500',
        status: 'active',
      ),
      ServiceModel(
        id: '2',
        serviceName: 'Mini Semester Project',
        description: 'Rapid, well-commented mini projects tailored for 2nd and 3rd-year engineering & polytechnic students.',
        icon: 'Code',
        features: [
          'Clean Modular Codebase',
          'Complete Documentation & PPT',
          'Fast 48-Hour Turnaround',
          'Free Installation & Run Support'
        ],
        priceRange: '₹1,500 - ₹3,500',
        status: 'active',
      ),
      ServiceModel(
        id: '3',
        serviceName: 'Project Reports & Documentation Only',
        description: 'Turnitin plagiarism-free custom project reports, synopsis, base paper summary, and IEEE formatted manuscripts.',
        icon: 'FileText',
        features: [
          'Zero Plagiarism Guarantee',
          'UML Diagram Package (ERD, DFD, Sequence)',
          'High Quality IEEE Formatting',
          'PDF & Editable Word Source Files'
        ],
        priceRange: '₹999 - ₹2,499',
        status: 'active',
      ),
      ServiceModel(
        id: '4',
        serviceName: 'Seminar / Presentation Slides (PPT)',
        description: 'Modern, high-impact presentation decks with visual graphics, animation, and speaker notes.',
        icon: 'Presentation',
        features: [
          'Modern Cyber Aesthetic Design',
          'Visual Diagrams & Flowcharts',
          'Custom Animations & Transitions'
        ],
        priceRange: '₹499 - ₹1,199',
        status: 'active',
      ),
    ];
  }
}
