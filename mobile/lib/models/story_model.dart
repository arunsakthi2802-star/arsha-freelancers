class StoryModel {
  final String id;
  final String title;
  final String content;
  final String category;
  final String coverImage;
  final String authorName;
  final DateTime createdAt;

  StoryModel({
    required this.id,
    required this.title,
    required this.content,
    required this.category,
    required this.coverImage,
    required this.authorName,
    required this.createdAt,
  });

  factory StoryModel.fromJson(Map<String, dynamic> json) {
    return StoryModel(
      id: json['_id'] ?? json['id'] ?? '',
      title: json['title'] ?? '',
      content: json['content'] ?? json['description'] ?? '',
      category: json['category'] ?? 'Success Story',
      coverImage: json['coverImage'] ?? json['image'] ?? '',
      authorName: json['authorName'] ?? (json['author'] is Map ? json['author']['fullName'] : 'Arsha Team'),
      createdAt: json['createdAt'] != null
          ? DateTime.tryParse(json['createdAt']) ?? DateTime.now()
          : DateTime.now(),
    );
  }
}
