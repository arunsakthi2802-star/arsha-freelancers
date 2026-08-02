import 'package:flutter/material.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import '../../core/constants/app_colors.dart';
import '../../models/project_model.dart';
import '../../widgets/glass_card.dart';
import '../../widgets/custom_button.dart';
import '../contact/quote_modal_sheet.dart';

class ProjectDetailModal extends StatelessWidget {
  final ProjectModel project;
  final bool isDark;

  const ProjectDetailModal({
    super.key,
    required this.project,
    required this.isDark,
  });

  static void show(BuildContext context, ProjectModel project, bool isDark) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) => ProjectDetailModal(project: project, isDark: isDark),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Container(
      height: MediaQuery.of(context).size.height * 0.85,
      decoration: BoxDecoration(
        color: isDark ? AppColors.dark200 : AppColors.light100,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
        border: Border.all(
          color: isDark ? AppColors.darkGlassBorder : AppColors.lightGlassBorder,
        ),
      ),
      child: Column(
        children: [
          // Drag Handle
          const SizedBox(height: 12),
          Container(
            width: 40,
            height: 4,
            decoration: BoxDecoration(
              color: Colors.grey.withValues(alpha: 0.4),
              borderRadius: BorderRadius.circular(2),
            ),
          ),
          const SizedBox(height: 12),

          Expanded(
            child: SingleChildScrollView(
              padding: const EdgeInsets.all(20),
              physics: const BouncingScrollPhysics(),
              child: Column(
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  // Badges Row
                  Row(
                    children: [
                      _buildChip(project.department, AppColors.brandBlue),
                      const SizedBox(width: 8),
                      _buildChip(project.category, AppColors.brandPurple),
                      const SizedBox(width: 8),
                      _buildChip(project.difficulty, AppColors.brandOrange),
                    ],
                  ),

                  const SizedBox(height: 16),

                  // Title
                  Text(
                    project.title,
                    style: TextStyle(
                      fontSize: 20,
                      fontWeight: FontWeight.w900,
                      color: isDark ? Colors.white : AppColors.textLightPrimary,
                      height: 1.3,
                    ),
                  ),

                  const SizedBox(height: 8),

                  Row(
                    children: [
                      const Icon(LucideIcons.globe, size: 16, color: AppColors.brandCyan),
                      const SizedBox(width: 6),
                      Text(
                        'Domain: ${project.domain}',
                        style: const TextStyle(
                          fontSize: 13,
                          fontWeight: FontWeight.bold,
                          color: AppColors.brandCyan,
                        ),
                      ),
                    ],
                  ),

                  const SizedBox(height: 20),

                  // Abstract Section
                  GlassCard(
                    isDarkMode: isDark,
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Row(
                          children: [
                            Icon(LucideIcons.fileText, size: 18, color: AppColors.brandBlue),
                            SizedBox(width: 8),
                            Text(
                              'Project Abstract',
                              style: TextStyle(
                                fontSize: 15,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                        const Divider(height: 20),
                        Text(
                          project.abstractText,
                          style: TextStyle(
                            fontSize: 13,
                            height: 1.5,
                            color: isDark ? AppColors.textDarkSecondary : AppColors.textLightSecondary,
                          ),
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 16),

                  // Tech Stack
                  GlassCard(
                    isDarkMode: isDark,
                    padding: const EdgeInsets.all(16),
                    child: Column(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        const Row(
                          children: [
                            Icon(LucideIcons.cpu, size: 18, color: AppColors.brandEmerald),
                            SizedBox(width: 8),
                            Text(
                              'Technologies & Tools',
                              style: TextStyle(
                                fontSize: 15,
                                fontWeight: FontWeight.bold,
                              ),
                            ),
                          ],
                        ),
                        const Divider(height: 20),
                        Wrap(
                          spacing: 8,
                          runSpacing: 8,
                          children: project.techStack.map((tech) {
                            return Container(
                              padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 5),
                              decoration: BoxDecoration(
                                color: isDark ? Colors.white.withValues(alpha: 0.08) : const Color(0xFFF1F5F9),
                                borderRadius: BorderRadius.circular(8),
                                border: Border.all(
                                  color: isDark ? Colors.white.withValues(alpha: 0.1) : const Color(0xFFCBD5E1),
                                ),
                              ),
                              child: Text(
                                tech,
                                style: TextStyle(
                                  fontSize: 12,
                                  fontWeight: FontWeight.w600,
                                  color: isDark ? Colors.white : const Color(0xFF1E293B),
                                ),
                              ),
                            );
                          }).toList(),
                        ),
                      ],
                    ),
                  ),

                  const SizedBox(height: 24),

                  // Actions
                  CustomButton(
                    text: 'Request Instant Price Quote',
                    icon: LucideIcons.send,
                    onPressed: () {
                      Navigator.pop(context);
                      QuoteModalSheet.show(
                        context,
                        preselectedService: 'Final Year Academic Project',
                        initialMessage: 'Project Title: ${project.title}',
                      );
                    },
                  ),
                ],
              ),
            ),
          ),
        ],
      ),
    );
  }

  Widget _buildChip(String text, Color color) {
    return Container(
      padding: const EdgeInsets.symmetric(horizontal: 10, vertical: 4),
      decoration: BoxDecoration(
        color: color.withValues(alpha: 0.15),
        borderRadius: BorderRadius.circular(8),
        border: Border.all(color: color.withValues(alpha: 0.3)),
      ),
      child: Text(
        text,
        style: TextStyle(
          fontSize: 11,
          fontWeight: FontWeight.bold,
          color: color,
        ),
      ),
    );
  }
}
