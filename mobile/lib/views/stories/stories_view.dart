import 'package:flutter/material.dart';

import 'package:provider/provider.dart';
import 'package:cached_network_image/cached_network_image.dart';
import '../../core/constants/app_colors.dart';
import '../../providers/theme_provider.dart';
import '../../providers/story_provider.dart';
import '../../widgets/glass_card.dart';
import 'story_detail_view.dart';

class StoriesView extends StatelessWidget {
  const StoriesView({super.key});

  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<ThemeProvider>(context);
    final storyProvider = Provider.of<StoryProvider>(context);
    final isDark = themeProvider.isDarkMode;

    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Text(
            'Student Stories & Tech Insights',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.w900,
              color: isDark ? Colors.white : AppColors.textLightPrimary,
            ),
          ),
          const SizedBox(height: 4),
          Text(
            'Read success stories, viva prep guides, and IEEE trend reports.',
            style: TextStyle(
              fontSize: 13,
              color: isDark ? AppColors.textDarkSecondary : AppColors.textLightSecondary,
            ),
          ),
          const SizedBox(height: 16),

          Expanded(
            child: storyProvider.isLoading
                ? const Center(child: CircularProgressIndicator(color: AppColors.brandBlue))
                : ListView.builder(
                    physics: const BouncingScrollPhysics(),
                    itemCount: storyProvider.stories.length,
                    itemBuilder: (context, index) {
                      final story = storyProvider.stories[index];
                      return GlassCard(
                        isDarkMode: isDark,
                        margin: const EdgeInsets.only(bottom: 14),
                        onTap: () => StoryDetailView.show(context, story, isDark),
                        child: Row(
                          children: [
                            if (story.coverImage.isNotEmpty)
                              ClipRRect(
                                borderRadius: BorderRadius.circular(10),
                                child: CachedNetworkImage(
                                  imageUrl: story.coverImage,
                                  width: 80,
                                  height: 80,
                                  fit: BoxFit.cover,
                                  errorWidget: (context, url, error) => const SizedBox(),
                                ),
                              ),
                            const SizedBox(width: 12),
                            Expanded(
                              child: Column(
                                crossAxisAlignment: CrossAxisAlignment.start,
                                children: [
                                  Text(
                                    story.category,
                                    style: const TextStyle(
                                      fontSize: 10,
                                      fontWeight: FontWeight.bold,
                                      color: AppColors.brandPurple,
                                    ),
                                  ),
                                  const SizedBox(height: 4),
                                  Text(
                                    story.title,
                                    maxLines: 2,
                                    overflow: TextOverflow.ellipsis,
                                    style: TextStyle(
                                      fontSize: 14,
                                      fontWeight: FontWeight.bold,
                                      color: isDark ? Colors.white : AppColors.textLightPrimary,
                                    ),
                                  ),
                                  const SizedBox(height: 6),
                                  Text(
                                    'By ${story.authorName}',
                                    style: TextStyle(
                                      fontSize: 11,
                                      color: isDark ? AppColors.textDarkSecondary : AppColors.textLightSecondary,
                                    ),
                                  ),
                                ],
                              ),
                            ),
                          ],
                        ),
                      );
                    },
                  ),
          ),
        ],
      ),
    );
  }
}
