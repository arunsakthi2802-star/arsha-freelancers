import 'package:flutter/material.dart';
import 'package:provider/provider.dart';
import 'package:url_launcher/url_launcher.dart';
import 'package:lucide_icons_flutter/lucide_icons.dart';
import '../../core/constants/app_colors.dart';
import '../../models/quote_model.dart';
import '../../providers/theme_provider.dart';
import '../../providers/service_provider.dart';
import '../../widgets/custom_button.dart';

class QuoteModalSheet extends StatefulWidget {
  final String? preselectedService;
  final String? initialMessage;

  const QuoteModalSheet({super.key, this.preselectedService, this.initialMessage});

  static void show(BuildContext context, {String? preselectedService, String? initialMessage}) {
    showModalBottomSheet(
      context: context,
      isScrollControlled: true,
      backgroundColor: Colors.transparent,
      builder: (ctx) => QuoteModalSheet(
        preselectedService: preselectedService,
        initialMessage: initialMessage,
      ),
    );
  }

  @override
  State<QuoteModalSheet> createState() => _QuoteModalSheetState();
}

class _QuoteModalSheetState extends State<QuoteModalSheet> {
  final _formKey = GlobalKey<FormState>();
  late TextEditingController _nameController;
  late TextEditingController _phoneController;
  late TextEditingController _emailController;
  late TextEditingController _collegeController;
  late TextEditingController _messageController;
  late String _selectedService;
  bool _isSubmitted = false;

  final List<String> servicesList = [
    'Final Year Academic Project',
    'Mini Semester Project',
    'Project Reports & Documentation Only',
    'Seminar / Presentation Slides (PPT)',
    'Emerging Tech Specializations Class',
  ];

  @override
  void initState() {
    super.initState();
    _nameController = TextEditingController();
    _phoneController = TextEditingController();
    _emailController = TextEditingController();
    _collegeController = TextEditingController();
    _messageController = TextEditingController(text: widget.initialMessage ?? '');
    _selectedService = widget.preselectedService ?? servicesList.first;
  }

  @override
  Widget build(BuildContext context) {
    final themeProvider = Provider.of<ThemeProvider>(context);
    final isDark = themeProvider.isDarkMode;

    return Container(
      height: MediaQuery.of(context).size.height * 0.9,
      decoration: BoxDecoration(
        color: isDark ? AppColors.dark200 : AppColors.light100,
        borderRadius: const BorderRadius.vertical(top: Radius.circular(24)),
        border: Border.all(
          color: isDark ? AppColors.darkGlassBorder : AppColors.lightGlassBorder,
        ),
      ),
      padding: EdgeInsets.only(
        left: 20,
        right: 20,
        top: 16,
        bottom: MediaQuery.of(context).viewInsets.bottom + 20,
      ),
      child: _isSubmitted
          ? _buildSuccessState(isDark)
          : SingleChildScrollView(
              physics: const BouncingScrollPhysics(),
              child: Form(
                key: _formKey,
                child: Column(
                  crossAxisAlignment: CrossAxisAlignment.start,
                  children: [
                    Row(
                      mainAxisAlignment: MainAxisAlignment.spaceBetween,
                      children: [
                        Text(
                          'Request an Instant Quote',
                          style: TextStyle(
                            fontSize: 18,
                            fontWeight: FontWeight.bold,
                            color: isDark ? Colors.white : AppColors.textLightPrimary,
                          ),
                        ),
                        IconButton(
                          icon: const Icon(LucideIcons.x, size: 20),
                          onPressed: () => Navigator.pop(context),
                        ),
                      ],
                    ),
                    const SizedBox(height: 12),

                    _buildField('Full Name *', _nameController, 'e.g. Anand R', isDark),
                    const SizedBox(height: 10),
                    Row(
                      children: [
                        Expanded(child: _buildField('WhatsApp Phone *', _phoneController, '+91 98765...', isDark, keyboardType: TextInputType.phone)),
                        const SizedBox(width: 10),
                        Expanded(child: _buildField('College Email *', _emailController, 'anand@gce...', isDark, keyboardType: TextInputType.emailAddress)),
                      ],
                    ),
                    const SizedBox(height: 10),
                    _buildField('College & Degree *', _collegeController, 'e.g. Sona College, M.C.A', isDark),
                    const SizedBox(height: 10),

                    // Service Dropdown
                    Text(
                      'Syllabus Service Required *',
                      style: TextStyle(
                        fontSize: 11,
                        fontWeight: FontWeight.bold,
                        color: isDark ? AppColors.textDarkSecondary : AppColors.textLightSecondary,
                      ),
                    ),
                    const SizedBox(height: 4),
                    DropdownButtonFormField<String>(
                      initialValue: _selectedService,
                      dropdownColor: isDark ? AppColors.dark300 : Colors.white,
                      style: TextStyle(fontSize: 13, color: isDark ? Colors.white : AppColors.textLightPrimary),
                      decoration: InputDecoration(
                        filled: true,
                        fillColor: isDark ? Colors.white.withValues(alpha: 0.05) : const Color(0xFFF1F5F9),
                        border: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide.none),
                      ),
                      items: servicesList.map((service) {
                        return DropdownMenuItem(value: service, child: Text(service));
                      }).toList(),
                      onChanged: (val) {
                        if (val != null) setState(() => _selectedService = val);
                      },
                    ),

                    const SizedBox(height: 10),
                    _buildField('Specific Guidelines / Topic *', _messageController, 'Briefly share guidelines or project specs...', isDark, maxLines: 3),

                    const SizedBox(height: 16),
                    CustomButton(
                      text: 'Submit Quote & Launch WhatsApp',
                      icon: LucideIcons.send,
                      onPressed: _handleSubmit,
                    ),
                  ],
                ),
              ),
            ),
    );
  }

  Widget _buildField(String label, TextEditingController controller, String hint, bool isDark, {int maxLines = 1, TextInputType? keyboardType}) {
    return Column(
      crossAxisAlignment: CrossAxisAlignment.start,
      children: [
        Text(
          label,
          style: TextStyle(
            fontSize: 11,
            fontWeight: FontWeight.bold,
            color: isDark ? AppColors.textDarkSecondary : AppColors.textLightSecondary,
          ),
        ),
        const SizedBox(height: 4),
        TextFormField(
          controller: controller,
          maxLines: maxLines,
          keyboardType: keyboardType,
          validator: (val) => val == null || val.isEmpty ? 'Required' : null,
          style: TextStyle(fontSize: 13, color: isDark ? Colors.white : AppColors.textLightPrimary),
          decoration: InputDecoration(
            hintText: hint,
            hintStyle: const TextStyle(fontSize: 12, color: Colors.grey),
            filled: true,
            fillColor: isDark ? Colors.white.withValues(alpha: 0.05) : const Color(0xFFF1F5F9),
            contentPadding: const EdgeInsets.symmetric(horizontal: 12, vertical: 10),
            border: OutlineInputBorder(borderRadius: BorderRadius.circular(10), borderSide: BorderSide.none),
          ),
        ),
      ],
    );
  }

  Widget _buildSuccessState(bool isDark) {
    return Column(
      mainAxisAlignment: MainAxisAlignment.center,
      children: [
        Container(
          padding: const EdgeInsets.all(16),
          decoration: const BoxDecoration(
            color: AppColors.brandEmerald,
            shape: BoxShape.circle,
          ),
          child: const Icon(LucideIcons.check, size: 36, color: Colors.white),
        ),
        const SizedBox(height: 16),
        Text(
          'Price Estimate Request Received!',
          style: TextStyle(
            fontSize: 18,
            fontWeight: FontWeight.bold,
            color: isDark ? Colors.white : AppColors.textLightPrimary,
          ),
        ),
        const SizedBox(height: 8),
        Text(
          'Thank you, ${_nameController.text}! Our technical counselor will evaluate your guidelines and contact you on WhatsApp.',
          textAlign: TextAlign.center,
          style: TextStyle(
            fontSize: 12,
            color: isDark ? AppColors.textDarkSecondary : AppColors.textLightSecondary,
          ),
        ),
        const SizedBox(height: 20),
        CustomButton(
          text: 'Close',
          onPressed: () => Navigator.pop(context),
        ),
      ],
    );
  }

  Future<void> _handleSubmit() async {
    if (!_formKey.currentState!.validate()) return;

    final quote = QuoteModel(
      name: _nameController.text.trim(),
      phone: _phoneController.text.trim(),
      email: _emailController.text.trim(),
      college: _collegeController.text.trim(),
      service: _selectedService,
      message: _messageController.text.trim(),
    );

    // Save to backend
    Provider.of<ServiceProvider>(context, listen: false).submitQuoteRequest(quote);

    // Launch WhatsApp
    final text = '*New Consultation / Quote Request*\n*Name:* ${quote.name}\n*Phone:* ${quote.phone}\n*College:* ${quote.college}\n*Service:* ${quote.service}\n*Guidelines:* ${quote.message}';
    final whatsappUrl = Uri.parse('https://wa.me/918300799120?text=${Uri.encodeComponent(text)}');

    if (await canLaunchUrl(whatsappUrl)) {
      await launchUrl(whatsappUrl, mode: LaunchMode.externalApplication);
    }

    setState(() => _isSubmitted = true);
  }
}
