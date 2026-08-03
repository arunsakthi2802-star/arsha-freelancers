import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:google_fonts/google_fonts.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';

import 'core/constants/app_colors.dart';
import 'providers/theme_provider.dart';
import 'providers/auth_provider.dart';
import 'providers/project_provider.dart';
import 'providers/service_provider.dart';
import 'providers/gallery_provider.dart';
import 'providers/story_provider.dart';
import 'providers/review_provider.dart';
import 'providers/chat_provider.dart';

import 'widgets/animated_mesh_bg.dart';
import 'widgets/custom_navbar.dart';
import 'views/home/home_view.dart';
import 'views/projects/projects_view.dart';
import 'views/services/services_view.dart';
import 'views/gallery/gallery_view.dart';

import 'views/reviews/reviews_view.dart';
import 'views/contact/contact_view.dart';
import 'views/auth/login_view.dart';
import 'views/dashboards/user_dashboard.dart';
import 'views/dashboards/manager_dashboard.dart';
import 'views/dashboards/admin_portal.dart';
import 'views/chat/ai_chat_bottom_sheet.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const ArshaMobileApp());
}

class ArshaMobileApp extends StatelessWidget {
  const ArshaMobileApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider(create: (_) => ThemeProvider()),
        ChangeNotifierProvider(create: (_) => AuthProvider()),
        ChangeNotifierProvider(create: (_) => ProjectProvider()),
        ChangeNotifierProvider(create: (_) => ServiceProvider()),
        ChangeNotifierProvider(create: (_) => GalleryProvider()),
        ChangeNotifierProvider(create: (_) => StoryProvider()),
        ChangeNotifierProvider(create: (_) => ReviewProvider()),
        ChangeNotifierProvider(create: (_) => ChatProvider()),
      ],
      child: Consumer<ThemeProvider>(
        builder: (context, themeProvider, child) {
          final isDark = themeProvider.isDarkMode;

          return MaterialApp(
            title: 'ARSHA Freelancers',
            debugShowCheckedModeBanner: false,
            themeMode: isDark ? ThemeMode.dark : ThemeMode.light,
            theme: ThemeData(
              brightness: Brightness.light,
              scaffoldBackgroundColor: AppColors.light100,
              textTheme: GoogleFonts.outfitTextTheme(ThemeData.light().textTheme),
              primaryColor: AppColors.brandBlue,
            ),
            darkTheme: ThemeData(
              brightness: Brightness.dark,
              scaffoldBackgroundColor: AppColors.dark100,
              textTheme: GoogleFonts.outfitTextTheme(ThemeData.dark().textTheme),
              primaryColor: AppColors.brandBlue,
            ),
            home: const MainShellView(),
          );
        },
      ),
    );
  }
}

class MainShellView extends StatefulWidget {
  const MainShellView({super.key});

  @override
  State<MainShellView> createState() => _MainShellViewState();
}

class _MainShellViewState extends State<MainShellView> {
  int _currentTabIndex = 0;

  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<ThemeProvider>(context);
    final authProvider = Provider.of<AuthProvider>(context);
    final isDark = themeProvider.isDarkMode;
    final user = authProvider.user;

    Widget bodyContent;
    switch (_currentTabIndex) {
      case 0:
        bodyContent = HomeView(onNavigateTab: (index) => setState(() => _currentTabIndex = index));
        break;
      case 1:
        bodyContent = const ProjectsView();
        break;
      case 2:
        bodyContent = const ServicesView();
        break;
      case 3:
        bodyContent = const GalleryView();
        break;
      case 4:
        bodyContent = const ReviewsView();
        break;
      case 5:
        bodyContent = const ContactView();
        break;
      default:
        bodyContent = HomeView(onNavigateTab: (index) => setState(() => _currentTabIndex = index));
    }

    return Scaffold(
      body: AnimatedMeshBackground(
        isDarkMode: isDark,
        child: Column(
          children: [
            // Top Custom Header / App Bar
            Padding(
              padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 10),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  // Logo & Brand Name
                  Row(
                    children: [
                      Container(
                        padding: const EdgeInsets.all(8),
                        decoration: BoxDecoration(
                          gradient: AppColors.primaryGradient,
                          borderRadius: BorderRadius.circular(10),
                        ),
                        child: const Icon(LucideIcons.code, size: 20, color: Colors.white),
                      ),
                      const SizedBox(width: 10),
                      RichText(
                        text: TextSpan(
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.w900,
                            fontFamily: 'Outfit',
                            color: isDark ? Colors.white : AppColors.textLightPrimary,
                          ),
                          children: const [
                            TextSpan(text: 'ARSHA '),
                            TextSpan(
                              text: 'FREELANCERS',
                              style: TextStyle(color: AppColors.brandBlue, fontSize: 14),
                            ),
                          ],
                        ),
                      ),
                    ],
                  ),

                  // Actions: Theme Switch & Auth User Profile / Login
                  Row(
                    children: [
                      // Theme Toggle Button
                      IconButton(
                        icon: Icon(
                          isDark ? LucideIcons.sun : LucideIcons.moon,
                          color: isDark ? Colors.amber : AppColors.brandPurple,
                          size: 20,
                        ),
                        onPressed: () => themeProvider.toggleTheme(),
                      ),

                      // User Profile or Login
                      if (authProvider.isAuthenticated)
                        PopupMenuButton<String>(
                          onSelected: (val) {
                            if (val == 'logout') {
                              authProvider.logout();
                            } else if (val == 'portal') {
                              _openRolePortal(context, user?.role);
                            }
                          },
                          itemBuilder: (context) => [
                            PopupMenuItem(
                              value: 'portal',
                              child: Row(
                                children: [
                                  const Icon(LucideIcons.userCheck, size: 16, color: AppColors.brandBlue),
                                  const SizedBox(width: 8),
                                  Text('${user?.role.toUpperCase()} Portal'),
                                ],
                              ),
                            ),
                            const PopupMenuItem(
                              value: 'logout',
                              child: Row(
                                children: [
                                  Icon(LucideIcons.logOut, size: 16, color: Colors.red),
                                  SizedBox(width: 8),
                                  Text('Logout'),
                                ],
                              ),
                            ),
                          ],
                          child: CircleAvatar(
                            radius: 16,
                            backgroundColor: AppColors.brandBlue,
                            child: Text(
                              user?.fullName[0].toUpperCase() ?? 'U',
                              style: const TextStyle(fontSize: 14, color: Colors.white, fontWeight: FontWeight.bold),
                            ),
                          ),
                        )
                      else
                        IconButton(
                          icon: const Icon(LucideIcons.user, size: 20, color: AppColors.brandBlue),
                          onPressed: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(builder: (context) => const LoginView()),
                            );
                          },
                        ),
                    ],
                  ),
                ],
              ),
            ),

            const Divider(height: 1),

            // Main Tab Content
            Expanded(child: bodyContent),
          ],
        ),
      ),

      // Floating AI Assistant Button
      floatingActionButton: FloatingActionButton(
        onPressed: () => AIChatBottomSheet.show(context),
        backgroundColor: Colors.transparent,
        elevation: 0,
        child: Container(
          width: 56,
          height: 56,
          decoration: const BoxDecoration(
            gradient: AppColors.accentGradient,
            shape: BoxShape.circle,
            boxShadow: [
              BoxShadow(color: AppColors.brandPink, blurRadius: 12, offset: Offset(0, 4))
            ],
          ),
          child: const Icon(LucideIcons.bot, color: Colors.white, size: 26),
        ),
      ),

      // Bottom Navigation Bar
      bottomNavigationBar: CustomBottomNavBar(
        currentIndex: _currentTabIndex,
        isDark: isDark,
        onTap: (index) => setState(() => _currentTabIndex = index),
      ),
    );
  }

  void _openRolePortal(BuildContext context, String? role) {
    Widget portalScreen;
    if (role == 'admin') {
      portalScreen = const AdminPortal();
    } else if (role == 'manager') {
      portalScreen = const ManagerDashboard();
    } else {
      portalScreen = const UserDashboard();
    }

    Navigator.push(
      context,
      MaterialPageRoute(
        builder: (context) => Scaffold(
          appBar: AppBar(title: Text('${role?.toUpperCase()} Dashboard')),
          body: portalScreen,
        ),
      ),
    );
  }
}
