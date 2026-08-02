import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import '../../core/constants/app_colors.dart';
import '../../providers/theme_provider.dart';
import '../../providers/project_provider.dart';
import '../../widgets/glass_card.dart';
import 'project_detail_modal.dart';

class ProjectsView extends StatelessWidget {
  const ProjectsView({super.key});

  static const List<String> departments = [
    'All',
    'CSE',
    'IT',
    'ECE',
    'Mechanical',
    'Civil',
  ];

  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<ThemeProvider>(context);
    final projectProvider = Provider.of<ProjectProvider>(context);
    final isDark = themeProvider.isDarkMode;

    return Padding(
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // Search Bar
          GlassCard(
            isDarkMode: isDark,
            padding: const EdgeInsets.symmetric(horizontal: 14, vertical: 4),
            child: TextField(
              onChanged: (val) => projectProvider.setSearchQuery(val),
              style: TextStyle(
                color: isDark ? Colors.white : AppColors.textLightPrimary,
                fontSize: 14,
              ),
              decoration: InputDecoration(
                hintText: 'Search by IEEE domain, tech stack...',
                hintStyle: TextStyle(
                  color: isDark ? AppColors.textDarkSecondary : AppColors.textLightSecondary,
                  fontSize: 13,
                ),
                border: InputBorder.none,
                icon: const Icon(LucideIcons.search, size: 18, color: AppColors.brandBlue),
              ),
            ),
          ),

          const SizedBox(height: 14),

          // Department Filter Chips
          SizedBox(
            height: 38,
            child: ListView.builder(
              scrollDirection: Axis.horizontal,
              itemCount: departments.length,
              physics: const BouncingScrollPhysics(),
              itemBuilder: (context, index) {
                final dept = departments[index];
                final isSelected = projectProvider.selectedDept == dept;

                return GestureDetector(
                  onTap: () => projectProvider.setSelectedDept(dept),
                  child: Container(
                    margin: const EdgeInsets.only(right: 8),
                    padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 8),
                    decoration: BoxDecoration(
                      gradient: isSelected ? AppColors.primaryGradient : null,
                      color: isSelected
                          ? null
                          : (isDark ? Colors.white.withValues(alpha: 0.06) : Colors.white),
                      borderRadius: BorderRadius.circular(20),
                      border: Border.all(
                        color: isSelected
                            ? Colors.transparent
                            : (isDark ? AppColors.darkGlassBorder : AppColors.lightGlassBorder),
                      ),
                    ),
                    child: Text(
                      dept,
                      style: TextStyle(
                        fontSize: 12,
                        fontWeight: isSelected ? FontWeight.bold : FontWeight.w500,
                        color: isSelected
                            ? Colors.white
                            : (isDark ? AppColors.textDarkSecondary : AppColors.textLightPrimary),
                      ),
                    ),
                  ),
                );
              },
            ),
          ),

          const SizedBox(height: 16),

          // Projects List
          Expanded(
            child: projectProvider.isLoading
                ? const Center(child: CircularProgressIndicator(color: AppColors.brandBlue))
                : projectProvider.filteredProjects.isEmpty
                    ? _buildEmptyState(isDark)
                    : ListView.builder(
                        physics: const BouncingScrollPhysics(),
                        itemCount: projectProvider.filteredProjects.length,
                        itemBuilder: (context, index) {
                          final project = projectProvider.filteredProjects[index];
                          return GlassCard(
                            isDarkMode: isDark,
                            margin: const EdgeInsets.only(bottom: 12),
                            onTap: () => ProjectDetailModal.show(context, project, isDark),
                            child: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: [
                                Row(
                                  mainAxisAlignment: MainAxisAlignment.spaceBetween,
                                  children: [
                                    Container(
                                      padding: const EdgeInsets.symmetric(
                                          horizontal: 8, vertical: 4),
                                      decoration: BoxDecoration(
                                        color: AppColors.brandBlue.withValues(alpha: 0.15),
                                        borderRadius: BorderRadius.circular(6),
                                      ),
                                      child: Text(
                                        project.department,
                                        style: const TextStyle(
                                          fontSize: 10,
                                          fontWeight: FontWeight.bold,
                                          color: AppColors.brandBlue,
                                        ),
                                      ),
                                    ),
                                    Text(
                                      project.category,
                                      style: TextStyle(
                                        fontSize: 11,
                                        color: isDark
                                            ? AppColors.textDarkSecondary
                                            : AppColors.textLightSecondary,
                                      ),
                                    ),
                                  ],
                                ),
                                const SizedBox(height: 10),
                                Text(
                                  project.title,
                                  style: TextStyle(
                                    fontSize: 15,
                                    fontWeight: FontWeight.bold,
                                    color: isDark ? Colors.white : AppColors.textLightPrimary,
                                  ),
                                ),
                                const SizedBox(height: 6),
                                Text(
                                  project.abstractText,
                                  maxLines: 2,
                                  overflow: TextOverflow.ellipsis,
                                  style: TextStyle(
                                    fontSize: 12,
                                    color: isDark
                                        ? AppColors.textDarkSecondary
                                        : AppColors.textLightSecondary,
                                  ),
                                ),
                                const SizedBox(height: 12),
                                Wrap(
                                  spacing: 6,
                                  children: project.techStack.map((tech) {
                                    return Container(
                                      padding: const EdgeInsets.symmetric(
                                          horizontal: 8, vertical: 3),
                                      decoration: BoxDecoration(
                                        color: isDark
                                            ? Colors.white.withValues(alpha: 0.05)
                                            : const Color(0xFFF1F5F9),
                                        borderRadius: BorderRadius.circular(4),
                                      ),
                                      child: Text(
                                        tech,
                                        style: const TextStyle(
                                            fontSize: 10, color: AppColors.brandCyan),
                                      ),
                                    );
                                  }).toList(),
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

  Widget _buildEmptyState(bool isDark) {
    return Center(
      child: Column(
        mainAxisAlignment: MainAxisAlignment.center,
        children: [
          Icon(LucideIcons.folderX,
              size: 48,
              color: isDark ? AppColors.textDarkSecondary : AppColors.textLightSecondary),
          const SizedBox(height: 12),
          Text(
            'No matching projects found',
            style: TextStyle(
              fontSize: 15,
              fontWeight: FontWeight.bold,
              color: isDark ? Colors.white : AppColors.textLightPrimary,
            ),
          ),
        ],
      ),
    );
  }
}
