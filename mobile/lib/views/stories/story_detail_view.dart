import 'package:flutter/material.dart';
import 'package:cached_network_image/cached_network_image.dart';
import 'package:intl/intl.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import '../../core/constants/app_colors.dart';
import '../../models/story_model.dart';

class StoryDetailView extends StatelessWidget {
  final StoryModel story;
  final bool isDark;

  const StoryDetailView({
    super.key,
    required this.story,
    required this.isDark,
  });

  static void show(BuildContext context, StoryModel story, bool isDark) {
    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => StoryDetailView(story: story, isDark: isDark),
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      backgroundColor: isDark ? AppColors.dark100 : AppColors.light100,
      appBar: AppBar(
        backgroundColor: Colors.transparent,
        elevation: 0,
        leading: IconButton(
          icon: Icon(LucideIcons.arrowLeft, color: isDark ? Colors.white : const Color(0xFF0F172A)),
          onPressed: () => Navigator.pop(context),
        ),
      ),
      body: SingleChildScrollView(
        physics: const BouncingScrollPhysics(),
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            if (story.coverImage.isNotEmpty) ...[
              ClipRRect(
                borderRadius: BorderRadius.circular(16),
                child: CachedNetworkImage(
                  imageUrl: story.coverImage,
                  height: 200,
                  width: double.infinity,
                  fit: BoxFit.cover,
                  errorWidget: (context, url, error) => const SizedBox(),
                ),
              ),
              const SizedBox(height: 16),
            ],

            Container(
              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
              decoration: BoxDecoration(
                color: AppColors.brandPurple.withValues(alpha: 0.15),
                borderRadius: BorderRadius.circular(8),
              ),
              child: Text(
                story.category,
                style: const TextStyle(fontSize: 12, fontWeight: FontWeight.bold, color: AppColors.brandPurple),
              ),
            ),
            const SizedBox(height: 12),

            Text(
              story.title,
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.w900,
                color: isDark ? Colors.white : AppColors.textLightPrimary,
                height: 1.3,
              ),
            ),
            const SizedBox(height: 8),

            Row(
              children: [
                Icon(LucideIcons.user, size: 14, color: isDark ? AppColors.textDarkSecondary : AppColors.textLightSecondary),
                const SizedBox(width: 4),
                Text(
                  story.authorName,
                  style: TextStyle(fontSize: 12, color: isDark ? AppColors.textDarkSecondary : AppColors.textLightSecondary),
                ),
                const SizedBox(width: 16),
                Icon(LucideIcons.calendar, size: 14, color: isDark ? AppColors.textDarkSecondary : AppColors.textLightSecondary),
                const SizedBox(width: 4),
                Text(
                  DateFormat.yMMMd().format(story.createdAt),
                  style: TextStyle(fontSize: 12, color: isDark ? AppColors.textDarkSecondary : AppColors.textLightSecondary),
                ),
              ],
            ),
            const Divider(height: 30),

            Text(
              story.content,
              style: TextStyle(
                fontSize: 14,
                height: 1.6,
                color: isDark ? Colors.white70 : const Color(0xFF1E293B),
              ),
            ),
          ],
        ),
      ),
    );
  }
}
