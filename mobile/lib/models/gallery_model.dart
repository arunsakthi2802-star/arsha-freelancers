class GalleryModel {
  final String id;
  final String title;
  final String image;
  final String category;
  final String? description;

  GalleryModel({
    required this.id,
    required this.title,
    required this.image,
    required this.category,
    this.description,
  });

  factory GalleryModel.fromJson(Map<String, dynamic> json) {
    return GalleryModel(
      id: json['_id'] ?? json['id'] ?? '',
      title: json['title'] ?? '',
      image: json['image'] ?? '',
      category: json['category'] ?? 'Projects',
      description: json['description'],
    );
  }
}
