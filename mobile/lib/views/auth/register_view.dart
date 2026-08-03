import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import '../../core/constants/app_colors.dart';
import '../../providers/auth_provider.dart';
import '../../providers/theme_provider.dart';
import '../../widgets/glass_card.dart';
import '../../widgets/custom_button.dart';

class RegisterView extends StatefulWidget {
  const RegisterView({super.key});

  @override
  State<RegisterView> createState() => _RegisterViewState();
}

class _RegisterViewState extends State<RegisterView> {
  final _formKey = GlobalKey<FormState>();
  final _nameController = TextEditingController();
  final _emailController = TextEditingController();
  final _phoneController = TextEditingController();
  final _collegeController = TextEditingController();
  final _passwordController = TextEditingController();

  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<ThemeProvider>(context);
    final authProvider = Provider.of<AuthProvider>(context);
    final isDark = themeProvider.isDarkMode;

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
      body: Center(
        child: SingleChildScrollView(
          padding: const EdgeInsets.all(24.0),
          physics: const BouncingScrollPhysics(),
          child: GlassCard(
            isDarkMode: isDark,
            padding: const EdgeInsets.all(24),
            child: Form(
              key: _formKey,
              child: Column(
                mainAxisSize: MainAxisSize.min,
                crossAxisAlignment: CrossAxisAlignment.start,
                children: [
                  Center(
                    child: Text(
                      'Create Student Account',
                      style: TextStyle(
                        fontSize: 20,
                        fontWeight: FontWeight.w900,
                        color: isDark ? Colors.white : AppColors.textLightPrimary,
                      ),
                    ),
                  ),
                  const SizedBox(height: 16),

                  if (authProvider.errorMessage != null) ...[
                    Text(authProvider.errorMessage!, style: const TextStyle(color: Colors.red, fontSize: 12)),
                    const SizedBox(height: 10),
                  ],

                  _buildField('Full Name *', _nameController, 'e.g. Anand R', isDark),
                  const SizedBox(height: 10),
                  _buildField('Email Address *', _emailController, 'anand@college.edu', isDark, keyboardType: TextInputType.emailAddress),
                  const SizedBox(height: 10),
                  _buildField('WhatsApp Phone *', _phoneController, '+91 9876543210', isDark, keyboardType: TextInputType.phone),
                  const SizedBox(height: 10),
                  _buildField('College & Degree *', _collegeController, 'e.g. Sona College, M.C.A', isDark),
                  const SizedBox(height: 10),
                  _buildField('Password *', _passwordController, '••••••••', isDark, obscureText: true),
                  const SizedBox(height: 20),

                  CustomButton(
                    text: 'Register Account',
                    isLoading: authProvider.isLoading,
                    onPressed: () async {
                      if (!_formKey.currentState!.validate()) return;
                      final success = await authProvider.register(
                        fullName: _nameController.text.trim(),
                        email: _emailController.text.trim(),
                        password: _passwordController.text.trim(),
                        phone: _phoneController.text.trim(),
                        college: _collegeController.text.trim(),
                      );
                      if (!context.mounted) return;
                      if (success) {
                        Navigator.pop(context);
                      }
                    },
                  ),
                ],
              ),
            ),
          ),
        ),
      ),
    );
  }

  Widget _buildField(String label, TextEditingController controller, String hint, bool isDark, {bool obscureText = false, TextInputType? keyboardType}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: TextStyle(fontSize: 11, fontWeight: FontWeight.bold, color: isDark ? AppColors.textDarkSecondary : AppColors.textLightSecondary),
        ),
        const SizedBox(height: 4),
        TextFormField(
          controller: controller,
          obscureText: obscureText,
          keyboardType: keyboardType,
          validator: (val) => val == null || val.isEmpty ? 'Required' : null,
          style: TextStyle(fontSize: 13, color: isDark ? Colors.white : AppColors.textLightPrimary),
          decoration: InputDecoration(
            hintText: hint,
            hintStyle: const TextStyle(fontSize: 12, color: Colors.grey),
            filled: true,
            fillColor: isDark ? Colors.white.withValues(alpha: 0.05) : const Color(0xFFF1F5F9),
            contentPadding: const EdgeInsets.all(10),
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide.none),
          ),
        ),
      ],
    );
  }
}
