import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:flutter_rating_bar/flutter_rating_bar.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import '../../core/constants/app_colors.dart';
import '../../providers/theme_provider.dart';
import '../../providers/review_provider.dart';
import '../../widgets/glass_card.dart';
import '../../widgets/custom_button.dart';
import 'add_review_dialog.dart';

class ReviewsView extends StatelessWidget {
  const ReviewsView({super.key});

  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<ThemeProvider>(context);
    final reviewProvider = Provider.of<ReviewProvider>(context);
    final isDark = themeProvider.isDarkMode;

    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Text(
                    'Student Testimonials',
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w900,
                      color: isDark ? Colors.white : AppColors.textLightPrimary,
                    ),
                  ),
                  const SizedBox(height: 4),
                  Text(
                    'Real feedback from engineering & MCA graduates.',
                    style: TextStyle(
                      fontSize: 12,
                      color: isDark ? AppColors.textDarkSecondary : AppColors.textLightSecondary,
                    ),
                  ),
                ],
              ),
              CustomButton(
                text: 'Write Review',
                icon: LucideIcons.penTool,
                onPressed: () => AddReviewDialog.show(context, isDark),
              ),
            ],
          ),

          const SizedBox(height: 16),

          Expanded(
            child: reviewProvider.isLoading
                ? const Center(child: CircularProgressIndicator(color: AppColors.brandBlue))
                : ListView.builder(
                    physics: const BouncingScrollPhysics(),
                    itemCount: reviewProvider.reviews.length,
                    itemBuilder: (context, index) {
                      final review = reviewProvider.reviews[index];
                      return GlassCard(
                        isDarkMode: isDark,
                        margin: const EdgeInsets.only(bottom: 12),
                        child: Column(
                          crossAxisAlignment: CrossAxisAlignment.start,
                          children: [
                            Row(
                              children: [
                                CircleAvatar(
                                  radius: 20,
                                  backgroundColor: AppColors.brandBlue.withValues(alpha: 0.2),
                                  child: Text(
                                    review.studentName[0].toUpperCase(),
                                    style: const TextStyle(
                                      color: AppColors.brandBlue,
                                      fontWeight: FontWeight.bold,
                                    ),
                                  ),
                                ),
                                const SizedBox(width: 12),
                                Expanded(
                                  child: Column(
                                    crossAxisAlignment: CrossAxisAlignment.start,
                                    children: [
                                      Text(
                                        review.studentName,
                                        style: TextStyle(
                                          fontSize: 14,
                                          fontWeight: FontWeight.bold,
                                          color: isDark ? Colors.white : AppColors.textLightPrimary,
                                        ),
                                      ),
                                      Text(
                                        review.collegeName,
                                        style: TextStyle(
                                          fontSize: 11,
                                          color: isDark
                                              ? AppColors.textDarkSecondary
                                              : AppColors.textLightSecondary,
                                        ),
                                      ),
                                    ],
                                  ),
                                ),
                                RatingBarIndicator(
                                  rating: review.rating.toDouble(),
                                  itemBuilder: (context, index) =>
                                      const Icon(LucideIcons.star, color: Colors.amber),
                                  itemCount: 5,
                                  itemSize: 16.0,
                                ),
                              ],
                            ),
                            const SizedBox(height: 10),
                            Container(
                              padding: const EdgeInsets.symmetric(horizontal: 8, vertical: 3),
                              decoration: BoxDecoration(
                                color: AppColors.brandPurple.withValues(alpha: 0.12),
                                borderRadius: BorderRadius.circular(6),
                              ),
                              child: Text(
                                review.projectTitle,
                                style: const TextStyle(
                                  fontSize: 11,
                                  fontWeight: FontWeight.w600,
                                  color: AppColors.brandPurple,
                                ),
                              ),
                            ),
                            const SizedBox(height: 10),
                            Text(
                              '"${review.reviewText}"',
                              style: TextStyle(
                                fontSize: 13,
                                fontStyle: FontStyle.italic,
                                height: 1.4,
                                color: isDark ? Colors.white70 : const Color(0xFF334155),
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
