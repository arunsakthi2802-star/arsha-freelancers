import 'package:flutter/material.dart';
import '../core/network/api_client.dart';
import '../core/constants/api_endpoints.dart';
import '../models/story_model.dart';

class StoryProvider extends ChangeNotifier {
  List<StoryModel> _stories = [];
  bool _isLoading = false;

  List<StoryModel> get stories => _stories;
  bool get isLoading => _isLoading;

  StoryProvider() {
    fetchStories();
  }

  Future<void> fetchStories() async {
    _isLoading = true;
    notifyListeners();

    try {
      final response = await ApiClient().client.get(ApiEndpoints.stories);
      if (response.statusCode == 200) {
        final List data = response.data['data'] ?? response.data['stories'] ?? [];
        _stories = data.map((item) => StoryModel.fromJson(item)).toList();
      }
    } catch (e) {
      if (_stories.isEmpty) {
        _stories = _getMockStories();
      }
    } finally {
      _isLoading = false;
      notifyListeners();
    }
  }

  List<StoryModel> _getMockStories() {
    return [
      StoryModel(
        id: '1',
        title: 'How 150+ CSE Students Secured S-Grade in IEEE AI Projects',
        content: 'Building a successful IEEE project requires a strong foundation in paper selection, architecture design, and viva preparation. Here is our step-by-step roadmap for final year students...',
        category: 'Guide',
        coverImage: 'https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80',
        authorName: 'Arsha Senior Lead',
        createdAt: DateTime.now().subtract(const Duration(days: 3)),
      ),
      StoryModel(
        id: '2',
        title: 'Top 10 High Impact IEEE 2026 Domains for Computer Science',
        content: 'From Generative AI to Federated Learning and Quantum Encryption, explore the most sought-after domains that impress college evaluators and university judges.',
        category: 'Trends',
        coverImage: 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
        authorName: 'Tech Research Cell',
        createdAt: DateTime.now().subtract(const Duration(days: 7)),
      ),
    ];
  }
}
