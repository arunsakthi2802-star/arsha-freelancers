import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import '../../core/constants/app_colors.dart';
import '../../widgets/glass_card.dart';
import '../../widgets/custom_button.dart';
import '../../providers/theme_provider.dart';
import '../../providers/service_provider.dart';
import '../contact/quote_modal_sheet.dart';

class HomeView extends StatelessWidget {
  final Function(int) onNavigateTab;

  const HomeView({super.key, required this.onNavigateTab});

  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<ThemeProvider>(context);
    final isDark = themeProvider.isDarkMode;

    return SingleChildScrollView(
      physics: const BouncingScrollPhysics(),
      padding: const EdgeInsets.all(16.0),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.start,
        children: [
          // 1. HERO BANNER
          GlassCard(
            isDarkMode: isDark,
            padding: const EdgeInsets.all(24),
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Container(
                  padding: const EdgeInsets.symmetric(horizontal: 12, vertical: 6),
                  decoration: BoxDecoration(
                    color: AppColors.brandBlue.withValues(alpha: 0.15),
                    borderRadius: BorderRadius.circular(20),
                    border: Border.all(color: AppColors.brandBlue.withValues(alpha: 0.3)),
                  ),
                  child: const Row(
                    mainAxisSize: MainAxisSize.min,
                    children: [
                      Icon(LucideIcons.sparkles, size: 14, color: AppColors.brandCyan),
                      SizedBox(width: 6),
                      Text(
                        'IEEE 2026 Academic Projects Specialist',
                        style: TextStyle(
                          fontSize: 11,
                          fontWeight: FontWeight.bold,
                          color: AppColors.brandCyan,
                        ),
                      ),
                    ],
                  ),
                ),
                const SizedBox(height: 16),
                RichText(
                  text: TextSpan(
                    style: TextStyle(
                      fontSize: 24,
                      fontWeight: FontWeight.w900,
                      color: isDark ? Colors.white : AppColors.textLightPrimary,
                      height: 1.2,
                    ),
                    children: const [
                      TextSpan(text: 'Empowering Engineers With '),
                      TextSpan(
                        text: 'S-Grade IEEE Projects',
                        style: TextStyle(color: AppColors.brandBlue),
                      ),
                      TextSpan(text: ' & Full Source Code.'),
                    ],
                  ),
                ),
                const SizedBox(height: 12),
                Text(
                  'Complete hardware, software, dataset, documentation, and 1-on-1 viva guidance for B.E / B.Tech / M.E / MCA / Polytechnic students.',
                  style: TextStyle(
                    fontSize: 13,
                    color: isDark ? AppColors.textDarkSecondary : AppColors.textLightSecondary,
                  ),
                ),
                const SizedBox(height: 20),
                Wrap(
                  spacing: 12,
                  runSpacing: 12,
                  children: [
                    CustomButton(
                      text: 'Explore Projects',
                      icon: LucideIcons.folder,
                      onPressed: () => onNavigateTab(1),
                    ),
                    CustomButton(
                      text: 'Get Quote',
                      icon: LucideIcons.send,
                      isSecondary: true,
                      onPressed: () => QuoteModalSheet.show(context),
                    ),
                  ],
                ),
              ],
            ),
          ),

          const SizedBox(height: 20),

          // 2. LIVE STATS COUNTER GRID
          Row(
            children: [
              Expanded(
                child: _buildStatCard(
                  isDark: isDark,
                  icon: LucideIcons.graduationCap,
                  value: '500+',
                  label: 'Students Guided',
                  color: AppColors.brandBlue,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _buildStatCard(
                  isDark: isDark,
                  icon: LucideIcons.award,
                  value: '99.4%',
                  label: 'Success Rate',
                  color: AppColors.brandEmerald,
                ),
              ),
            ],
          ),

          const SizedBox(height: 12),

          Row(
            children: [
              Expanded(
                child: _buildStatCard(
                  isDark: isDark,
                  icon: LucideIcons.layers,
                  value: '120+',
                  label: 'IEEE Titles',
                  color: AppColors.brandPurple,
                ),
              ),
              const SizedBox(width: 12),
              Expanded(
                child: _buildStatCard(
                  isDark: isDark,
                  icon: LucideIcons.clock,
                  value: '24/7',
                  label: 'Viva Support',
                  color: AppColors.brandOrange,
                ),
              ),
            ],
          ),

          const SizedBox(height: 24),

          // 3. TOP FEATURED SERVICES PREVIEW
          Row(
            mainAxisAlignment: MainAxisAlignment.spaceBetween,
            children: [
              Text(
                'Academic Services',
                style: TextStyle(
                  fontSize: 18,
                  fontWeight: FontWeight.bold,
                  color: isDark ? Colors.white : AppColors.textLightPrimary,
                ),
              ),
              TextButton(
                onPressed: () => onNavigateTab(2),
                child: const Text('View All', style: TextStyle(color: AppColors.brandBlue)),
              ),
            ],
          ),

          const SizedBox(height: 8),

          Consumer<ServiceProvider>(
            builder: (context, serviceProvider, child) {
              return Column(
                children: serviceProvider.services.take(3).map((service) {
                  return GlassCard(
                    isDarkMode: isDark,
                    margin: const EdgeInsets.only(bottom: 12),
                    onTap: () => QuoteModalSheet.show(context, preselectedService: service.serviceName),
                    child: Row(
                      crossAxisAlignment: CrossAxisAlignment.start,
                      children: [
                        Container(
                          padding: const EdgeInsets.all(12),
                          decoration: BoxDecoration(
                            color: AppColors.brandBlue.withValues(alpha: 0.15),
                            borderRadius: BorderRadius.circular(12),
                          ),
                          child: const Icon(LucideIcons.code, color: AppColors.brandBlue, size: 24),
                        ),
                        const SizedBox(width: 14),
                        Expanded(
                          child: Column(
                            crossAxisAlignment: CrossAxisAlignment.start,
                            children: [
                              Text(
                                service.serviceName,
                                style: TextStyle(
                                  fontSize: 15,
                                  fontWeight: FontWeight.bold,
                                  color: isDark ? Colors.white : AppColors.textLightPrimary,
                                ),
                              ),
                              const SizedBox(height: 4),
                              Text(
                                service.description,
                                maxLines: 2,
                                overflow: TextOverflow.ellipsis,
                                style: TextStyle(
                                  fontSize: 12,
                                  color: isDark ? AppColors.textDarkSecondary : AppColors.textLightSecondary,
                                ),
                              ),
                              const SizedBox(height: 8),
                              Text(
                                service.priceRange,
                                style: const TextStyle(
                                  fontSize: 13,
                                  fontWeight: FontWeight.w800,
                                  color: AppColors.brandEmerald,
                                ),
                              ),
                            ],
                          ),
                        ),
                      ],
                    ),
                  );
                }).toList(),
              );
            },
          ),
        ],
      ),
    );
  }

  Widget _buildStatCard({
    required bool isDark,
    required IconData icon,
    required String value,
    required String label,
    required Color color,
  }) {
    return GlassCard(
      isDarkMode: isDark,
      padding: const EdgeInsets.all(16),
      child: Row(
        children: [
          Container(
            padding: const EdgeInsets.all(10),
            decoration: BoxDecoration(
              color: color.withValues(alpha: 0.15),
              borderRadius: BorderRadius.circular(10),
            ),
            child: Icon(icon, color: color, size: 20),
          ),
          const SizedBox(width: 12),
          Expanded(
            child: Column(
              crossAxisAlignment: CrossAxisAlignment.start,
              children: [
                Text(
                  value,
                  style: TextStyle(
                    fontSize: 18,
                    fontWeight: FontWeight.w800,
                    color: isDark ? Colors.white : AppColors.textLightPrimary,
                  ),
                ),
                Text(
                  label,
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
  }
}
