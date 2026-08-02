import 'package:flutter/material.dart';
import '../core/network/api_client.dart';
import '../core/constants/api_endpoints.dart';
import '../models/gallery_model.dart';

class GalleryProvider extends ChangeNotifier {
  List<GalleryModel> _items = [];
  bool _isLoading = false;

  List<GalleryModel> get items => _items;
  bool get isLoading => _isLoading;

  GalleryProvider() {
    fetchGallery();
  }

  Future<void> fetchGallery() async {
    _isLoading = true;
    notifyListeners();

    try {
      final response = await ApiClient().client.get(ApiEndpoints.gallery);
      if (response.statusCode == 200) {
        final List data = response.data['data'] ?? response.data['gallery'] ?? [];
        _items = data.map((item) => GalleryModel.fromJson(item)).toList();
      }
    } catch (e) {
      if (_items.isEmpty) {
        _items = _getMockGallery();
      }
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  List<GalleryModel> _getMockGallery() {
    return [
      GalleryModel(
        id: '1',
        title: 'IEEE AI Healthcare Dashboard UI',
        image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80',
        category: 'AI & ML',
        description: 'Flutter & Python real-time patient vitals monitoring UI.',
      ),
      GalleryModel(
        id: '2',
        title: 'Smart IoT Agriculture Drone Hardware',
        image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=800&q=80',
        category: 'IoT & Hardware',
        description: 'Raspberry Pi edge camera setup for automated crop inspection.',
      ),
      GalleryModel(
        id: '3',
        title: 'Cyber Security Penetration Testing Lab',
        image: 'https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?auto=format&fit=crop&w=800&q=80',
        category: 'Cyber Security',
        description: 'Automated vulnerability scanner and reporting suite.',
      ),
      GalleryModel(
        id: '4',
        title: 'Cloud Full Stack React Dashboard',
        image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80',
        category: 'Web App',
        description: 'Scalable cloud analytics dashboard for academic projects.',
      ),
    ];
  }
}
